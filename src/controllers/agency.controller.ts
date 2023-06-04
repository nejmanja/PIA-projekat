import express from "express";
import UserModel from "../models/user";
import { MongoError } from "mongodb";

export class AgencyController {
	getAll = (req: express.Request, res: express.Response) => {
		UserModel.find({ type: 1 }, {username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1}, (err: MongoError, agencies) => {
			if (err) {
				console.log(err);
				res.status(404).json({ msg: "Agencija ne postoji!" });
			} else res.status(200).json(agencies);
		});
	};

    getOne = (req: express.Request, res: express.Response) => {
		UserModel.find({ type: 1, username: req.query.username }, {username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1}, (err: MongoError, agencies) => {
			if (err) {
				console.log(err);
				res.status(404).json({ msg: "Agencija ne postoji!" });
			} else res.status(200).json(agencies);
		});
	};
}
