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
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
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
    }
}
exports.HousingController = HousingController;
//# sourceMappingURL=housing.controller.js.map