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
			roomStatus: [],
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
                $unwind: '$agencyData'
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
                $unwind: '$housingData'
            },
			{
				$project: {
					owner: 1,
					agency: 1,
                    status: 1,
					housingId: 1,
					"agencyData.agencyName": 1,
					"housingData.address": 1,
				},
			},
		]);

		if (docs.length > 0) {
			res.status(200).json(docs);
		} else {
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};
}
