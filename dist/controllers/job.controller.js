"use strict";
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
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map