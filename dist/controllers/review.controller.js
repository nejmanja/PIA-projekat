"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_1 = __importDefault(require("../models/review"));
class ReviewController {
    constructor() {
        this.addOne = (req, res) => {
            const review = new review_1.default({
                agency: req.body.agency,
                user: req.body.user,
                jobId: req.body.jobId,
                rating: req.body.rating,
                review: req.body.review,
            });
            review.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json({ msg: "OK" });
                }
            });
        };
        this.getOne = (req, res) => {
            review_1.default.findOne({ jobId: req.query.jobId }, (err, doc) => {
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
            review_1.default.updateOne({ jobId: req.body.jobId }, { rating: req.body.rating, review: req.body.review }, (err, doc) => {
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
        this.deleteOne = (req, res) => {
            review_1.default.deleteOne({ jobId: req.query.jobId }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.getAllForAgency = (req, res) => {
            review_1.default.find({ agency: req.query.agency }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map