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
exports.WorkerController = void 0;
const worker_1 = __importDefault(require("../models/worker"));
const user_1 = __importDefault(require("../models/user"));
class WorkerController {
    constructor() {
        this.getForAgency = (req, res) => {
            let username = req.query.username; // agency username
            worker_1.default.find({ agency: username }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else
                    res.status(200).json(docs);
            });
        };
        this.updateOne = (req, res) => {
            let updateBlock = {
                name: req.body.worker.name,
                surname: req.body.worker.surname,
                phoneNum: req.body.worker.phoneNum,
                email: req.body.worker.email,
                speciality: req.body.worker.speciality,
            };
            // fields that aren't required
            if (req.body.worker.roomInd != undefined)
                updateBlock["roomInd"] = req.body.worker.roomInd;
            if (req.body.worker.jobId != undefined)
                updateBlock["jobId"] = req.body.worker.jobId;
            worker_1.default.updateOne({ _id: req.body.worker._id }, updateBlock, (err, docs) => {
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
        this.addOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const worker = new worker_1.default({
                agency: req.body.worker.agency,
                name: req.body.worker.name,
                surname: req.body.worker.surname,
                speciality: req.body.worker.speciality,
                email: req.body.worker.email,
                phoneNum: req.body.worker.phoneNum,
            });
            try {
                yield worker.save();
                res.status(200).json({ msg: "OK" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.addOneWithDecrement = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const worker = new worker_1.default({
                agency: req.body.worker.agency,
                name: req.body.worker.name,
                surname: req.body.worker.surname,
                speciality: req.body.worker.speciality,
                email: req.body.worker.email,
                phoneNum: req.body.worker.phoneNum,
            });
            try {
                yield worker.save();
                yield user_1.default.updateOne({ username: req.body.worker.agency }, { $inc: { workplaces: -1 } });
                res.status(200).json({ msg: "OK" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.removeOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield worker_1.default.findOneAndDelete({ _id: req.query.id });
                console.log(result);
                res.status(200).json({ msg: "OK" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.removeOneWithIncrement = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield worker_1.default.findOneAndDelete({ _id: req.query.id });
                console.log(result);
                yield user_1.default.updateOne({ username: result.agency }, { $inc: { workplaces: 1 } });
                res.status(200).json({ msg: "OK" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=worker.controller.js.map