import express from "express";
import WorkerModel from "../models/worker";
import UserModel from "../models/user";
import { MongoError } from "mongodb";

export class WorkerController {
	getForAgency = (req: express.Request, res: express.Response) => {
		let username = req.query.username; // agency username
		WorkerModel.find({ agency: username }, (err, docs) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else res.status(200).json(docs);
		});
	};
	updateOne = (req: express.Request, res: express.Response) => {
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
		WorkerModel.updateOne(
			{ _id: req.body.worker._id },
			updateBlock,
			(err, docs) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greške, pokušajte ponovo!" });
				} else res.status(200).json(docs);
			}
		);
	};

	addOne = async (req: express.Request, res: express.Response) => {
		const worker = new WorkerModel({
			agency: req.body.worker.agency,
			name: req.body.worker.name,
			surname: req.body.worker.surname,
			speciality: req.body.worker.speciality,
			email: req.body.worker.email,
			phoneNum: req.body.worker.phoneNum,
		});
		try {
			await worker.save();
			res.status(200).json({ msg: "OK" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	addOneWithDecrement = async (req: express.Request, res: express.Response) => {
		const worker = new WorkerModel({
			agency: req.body.worker.agency,
			name: req.body.worker.name,
			surname: req.body.worker.surname,
			speciality: req.body.worker.speciality,
			email: req.body.worker.email,
			phoneNum: req.body.worker.phoneNum,
		});
		try {
			await worker.save();
			await UserModel.updateOne(
				{ username: req.body.worker.agency },
				{ $inc: { workplaces: -1 } }
			);
			res.status(200).json({ msg: "OK" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};
	removeOne = async (req: express.Request, res: express.Response) => {
		try {
			const result = await WorkerModel.findOneAndDelete({ _id: req.query.id });
			res.status(200).json({ msg: "OK" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	removeOneWithIncrement = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			const result = await WorkerModel.findOneAndDelete({ _id: req.query.id });
			await UserModel.updateOne(
				{ username: result.agency },
				{ $inc: { workplaces: 1 } }
			);
			res.status(200).json({ msg: "OK" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	finishWork = (req: express.Request, res: express.Response) => {
		WorkerModel.updateMany(
			{ jobId: req.body.jobId },
			{ $unset: { jobId: "", roomInd: "" } },
			(err, docs) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greške, pokušajte ponovo!" });
				} else {
					res.status(200).json(docs);
				}
			}
		);
	};
}
