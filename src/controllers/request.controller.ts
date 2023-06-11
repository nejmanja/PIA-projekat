import express from "express";
import WorkplaceRequestModel from "../models/workplace-request"
import { MongoError } from "mongodb";

export class WorkplaceRequestController {
	addOne = (req: express.Request, res: express.Response) => {
		const wpreq = new WorkplaceRequestModel({
            agency: req.body.agency,
            numWorkplaces: req.body.numWorkplaces
		});
		wpreq.save((err: MongoError, dbres) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json({ msg: "OK" });
			}
		});
	};
}