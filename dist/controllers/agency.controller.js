"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AgencyController {
    constructor() {
        this.getAll = (req, res) => {
            user_1.default.find({ type: 1 }, { username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1 }, (err, agencies) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ msg: "Agencija ne postoji!" });
                }
                else
                    res.status(200).json(agencies);
            });
        };
        this.getOne = (req, res) => {
            user_1.default.find({ type: 1, username: req.query.username }, { username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1 }, (err, agencies) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ msg: "Agencija ne postoji!" });
                }
                else
                    res.status(200).json(agencies);
            });
        };
        this.getOneFull = (req, res) => {
            user_1.default.findOne({ type: 1, username: req.query.username }, (err, agencies) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ msg: "Agencija ne postoji!" });
                }
                else
                    res.status(200).json(agencies);
            });
        };
        this.updateOne = (req, res) => {
            let updateBlock = {};
            if (req.body.agencyName != null)
                updateBlock['agencyName'] = req.body.agencyName;
            if (req.body.country != null)
                updateBlock['country'] = req.body.country;
            if (req.body.city != null)
                updateBlock['city'] = req.body.city;
            if (req.body.street != null)
                updateBlock['street'] = req.body.street;
            if (req.body.email != null)
                updateBlock['email'] = req.body.email;
            if (req.body.desc != null)
                updateBlock['desc'] = req.body.desc;
            if (req.body.phoneNum != null)
                updateBlock['phoneNum'] = req.body.phoneNum;
            if (req.body.profilePic != null)
                updateBlock['profilePic'] = req.body.profilePic;
            user_1.default.findOneAndUpdate({ username: req.query.username }, { "$set": updateBlock }, (err, docs) => {
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
        this.deleteOne = (req, res) => {
            user_1.default.deleteOne({ type: 1, username: req.query.username }, (err, docs) => {
                if (err) {
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
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map