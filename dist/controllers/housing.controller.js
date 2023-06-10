"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingController = void 0;
const housing_1 = __importDefault(require("../models/housing"));
class HousingController {
    constructor() {
        this.getForUser = (req, res) => {
            housing_1.default.find({ owner: req.query.username }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else
                    res.status(200).json(docs);
            });
        };
        this.getOne = (req, res) => {
            housing_1.default.findById(req.query.id, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
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
                    console.log(docs);
                    res.status(200).json(docs);
                }
            });
        };
    }
}
exports.HousingController = HousingController;
//# sourceMappingURL=housing.controller.js.map