import express from "express";
import JobModel from "../models/job";
import { MongoError } from "mongodb";

export class JobController {
	addOne = (req: express.Request, res: express.Response) => {
		const job = new JobModel({
			owner: req.body.username,
			agency: req.body.agencyUsername,
			housingId: req.body.housingId,
			status: "requested",
			roomStatus: [false, false, false],
		});
		// todo check if someone is already working on this housing
		job.save((err: MongoError, dbres) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json({ msg: "OK" });
			}
		});
	};

	getAllForUser = async (req: express.Request, res: express.Response) => {
		// and that, kids, is how you do a SQL join in mongodb 💀
		try {
			let docs = await JobModel.aggregate([
				{
					$match: { owner: { $eq: req.query.username } },
				},
				{
					$lookup: {
						from: "users",
						localField: "agency",
						foreignField: "username",
						as: "agencyData",
					},
				},
				{
					$unwind: "$agencyData",
				},
				{
					$lookup: {
						from: "housing",
						localField: "housingId",
						foreignField: "_id",
						as: "housingData",
					},
				},
				{
					$unwind: "$housingData",
				},
				{
					$project: {
						owner: 1,
						agency: 1,
						status: 1,
						housingId: 1,
						compensation: 1,
						"agencyData.agencyName": 1,
						"housingData.address": 1,
					},
				},
			]);

			res.status(200).json(docs);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	getAllForAgency = async (req: express.Request, res: express.Response) => {
		try {
			let docs = await JobModel.aggregate([
				{
					$match: {
						agency: { $eq: req.query.username },
						$and: [
							{ status: { $ne: "denied" } },
							{ status: { $ne: "pending" } },
						], // skip the denied reqs
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "username",
						as: "userData",
					},
				},
				{
					$unwind: "$userData",
				},
				{
					$lookup: {
						from: "housing",
						localField: "housingId",
						foreignField: "_id",
						as: "housingData",
					},
				},
				{
					$unwind: "$housingData",
				},
				{
					$project: {
						owner: 1,
						agency: 1,
						status: 1,
						housingId: 1,
						"userData.name": 1,
						"userData.surname": 1,
						"housingData.address": 1,
					},
				},
			]);
			res.status(200).json(docs);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	updateStatus = (req: express.Request, res: express.Response) => {
		JobModel.updateOne(
			{ _id: req.body.id },
			{ status: req.body.status },
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

	accept = (req: express.Request, res: express.Response) => {
		JobModel.updateOne(
			{ _id: req.body.id },
			{ status: "pending", compensation: req.body.compensation },
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

	getOne = (req: express.Request, res: express.Response) => {
		JobModel.findById(req.query.id).exec((err, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};

	deleteOne = (req: express.Request, res: express.Response) => {
		JobModel.deleteOne({ _id: req.query.id }, (err, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};
}
