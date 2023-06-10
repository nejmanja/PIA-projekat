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
}
