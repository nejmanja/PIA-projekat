import express from "express";
import ReviewModel from "../models/review";
import { MongoError } from "mongodb";

export class ReviewController {
	addOne = (req: express.Request, res: express.Response) => {
		const review = new ReviewModel({
			agency: req.body.agency,
			user: req.body.user,
			jobId: req.body.jobId,
			rating: req.body.rating,
			review: req.body.review,
		});
		review.save((err: MongoError, dbres) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json({ msg: "OK" });
			}
		});
	};

	getOne = (req: express.Request, res: express.Response) => {
		ReviewModel.findOne({ jobId: req.query.jobId }, (err, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};
	updateOne = (req: express.Request, res: express.Response) => {
		ReviewModel.updateOne(
			{ jobId: req.body.jobId },
			{ rating: req.body.rating, review: req.body.review },
			(err, doc) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greške, pokušajte ponovo!" });
				} else {
					res.status(200).json(doc);
				}
			}
		);
	};
	deleteOne = (req: express.Request, res: express.Response) => {
		ReviewModel.deleteOne({ jobId: req.query.jobId }, (err, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};
	getAllForAgency = (req: express.Request, res: express.Response) => {
		ReviewModel.find({ agency: req.query.agency }, (err, docs) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(docs);
			}
		});
	};
}
