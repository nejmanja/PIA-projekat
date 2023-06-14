"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_1 = __importDefault(require("../models/job"));
class JobController {
    constructor() {
        this.addOne = (req, res) => {
            const job = new job_1.default({
                owner: req.body.username,
                agency: req.body.agencyUsername,
                housingId: req.body.housingId,
                status: "requested",
                roomStatus: [false, false, false],
            });
            // todo check if someone is already working on this housing
            job.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json({ msg: "OK" });
                }
            });
        };
        this.getAllForUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // and that, kids, is how you do a SQL join in mongodb 💀
            try {
                let docs = yield job_1.default.aggregate([
                    {
                        $match: { owner: { $eq: req.query.username } },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "agency",
                            foreignField: "username",
                            as: "agencyData",
                        },
                    },
                    {
                        $unwind: "$agencyData",
                    },
                    {
                        $lookup: {
                            from: "housing",
                            localField: "housingId",
                            foreignField: "_id",
                            as: "housingData",
                        },
                    },
                    {
                        $unwind: "$housingData",
                    },
                    {
                        $project: {
                            owner: 1,
                            agency: 1,
                            status: 1,
                            housingId: 1,
                            compensation: 1,
                            "agencyData.agencyName": 1,
                            "housingData.address": 1,
                        },
                    },
                ]);
                res.status(200).json(docs);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.getAllForAgency = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = yield job_1.default.aggregate([
                    {
                        $match: {
                            agency: { $eq: req.query.username },
                            $and: [
                                { status: { $ne: "denied" } },
                                { status: { $ne: "pending" } },
                            ], // skip the denied reqs
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "username",
                            as: "userData",
                        },
                    },
                    {
                        $unwind: "$userData",
                    },
                    {
                        $lookup: {
                            from: "housing",
                            localField: "housingId",
                            foreignField: "_id",
                            as: "housingData",
                        },
                    },
                    {
                        $unwind: "$housingData",
                    },
                    {
                        $project: {
                            owner: 1,
                            agency: 1,
                            status: 1,
                            housingId: 1,
                            "userData.name": 1,
                            "userData.surname": 1,
                            "housingData.address": 1,
                        },
                    },
                ]);
                res.status(200).json(docs);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = yield job_1.default.aggregate([
                    {
                        $lookup: {
                            from: "housing",
                            localField: "housingId",
                            foreignField: "_id",
                            as: "housingData",
                        },
                    },
                    {
                        $unwind: "$housingData",
                    },
                    {
                        $project: {
                            owner: 1,
                            agency: 1,
                            status: 1,
                            housingId: 1,
                            compensation: 1,
                            "housingData.address": 1,
                        },
                    },
                ]);
                res.status(200).json(docs);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.updateStatus = (req, res) => {
            job_1.default.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.accept = (req, res) => {
            job_1.default.updateOne({ _id: req.body.id }, { status: "pending", compensation: req.body.compensation }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.getOne = (req, res) => {
            job_1.default.findById(req.query.id).exec((err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.deleteOne = (req, res) => {
            job_1.default.deleteOne({ _id: req.query.id }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.finishRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let roomStatus = yield job_1.default.findById(req.body.id, { roomStatus: 1 });
                roomStatus.roomStatus[parseInt(req.body.roomInd)] = true;
                const result = yield job_1.default.updateOne({ _id: req.body.id }, { roomStatus: roomStatus.roomStatus });
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map