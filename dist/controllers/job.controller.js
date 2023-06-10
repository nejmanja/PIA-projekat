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
                roomStatus: [],
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
                    $unwind: '$agencyData'
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
                    $unwind: '$housingData'
                },
                {
                    $project: {
                        owner: 1,
                        agency: 1,
                        status: 1,
                        housingId: 1,
                        "agencyData.agencyName": 1,
                        "housingData.address": 1,
                    },
                },
            ]);
            if (docs.length > 0) {
                res.status(200).json(docs);
            }
            else {
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map