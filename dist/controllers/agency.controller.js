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
            user_1.default.find({ type: 1 }, { username: 1, agencyName: 1, desc: 1, profilePic: 1 }, (err, agencies) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ msg: "Korisnik ne postoji!" });
                }
                else
                    res.status(200).json(agencies);
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map