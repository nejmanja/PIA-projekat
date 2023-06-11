"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkplaceRequestController = void 0;
const workplace_request_1 = __importDefault(require("../models/workplace-request"));
class WorkplaceRequestController {
    constructor() {
        this.addOne = (req, res) => {
            const wpreq = new workplace_request_1.default({
                agency: req.body.agency,
                numWorkplaces: req.body.numWorkplaces
            });
            wpreq.save((err, dbres) => {
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
exports.WorkplaceRequestController = WorkplaceRequestController;
//# sourceMappingURL=request.controller.js.map