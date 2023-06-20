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
exports.HousingController = void 0;
const housing_1 = __importDefault(require("../models/housing"));
const job_1 = __importDefault(require("../models/job"));
class HousingController {
    constructor() {
        this.getForUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = yield housing_1.default.find({ owner: req.query.username });
                let result = [];
                for (let i = 0; i < docs.length; i++) {
                    const doc = docs[i];
                    const cnt = yield job_1.default.countDocuments({
                        housingId: doc._id,
                        $and: [
                            { status: { $ne: "denied" } },
                            { status: { $ne: "finished" } },
                        ],
                    });
                    result.push(Object.assign(Object.assign({}, doc['_doc']), { numOngoingJobs: cnt }));
                }
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = yield housing_1.default.findById(req.query.id);
                const cnt = yield job_1.default.countDocuments({
                    housingId: doc._id,
                    $and: [
                        { status: { $ne: "denied" } },
                        { status: { $ne: "finished" } },
                    ],
                });
                doc['_doc']["numOngoingJobs"] = cnt;
                res.status(200).json(doc);
            }
            catch (err) {
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.addOne = (req, res) => {
            const newHousing = new housing_1.default({
                owner: req.body.owner,
                type: req.body.type,
                address: req.body.address,
                numRooms: req.body.numRooms,
                area: req.body.area,
                rooms: req.body.rooms,
                doors: req.body.doors,
            });
            newHousing.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json({ msg: "OK" });
                }
            });
        };
        this.removeOne = (req, res) => {
            housing_1.default.findByIdAndRemove(req.query.id, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.updateOne = (req, res) => {
            let updateBlock = {};
            if (req.body.type != null)
                updateBlock["type"] = req.body.type;
            if (req.body.address != null)
                updateBlock["address"] = req.body.address;
            if (req.body.numRooms != null)
                updateBlock["numRooms"] = req.body.numRooms;
            if (req.body.rooms != null)
                updateBlock["rooms"] = req.body.rooms;
            if (req.body.doors != null)
                updateBlock["doors"] = req.body.doors;
            if (req.body.area != null)
                updateBlock["area"] = req.body.area;
            housing_1.default.findByIdAndUpdate(req.query.id, { $set: updateBlock }, (err, docs) => {
                if (docs == null || err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };
        this.countOngoingJobs = (req, res) => { };
    }
}
exports.HousingController = HousingController;
//# sourceMappingURL=housing.controller.js.map