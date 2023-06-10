import express from "express";
import UserModel from "../models/user";
import { MongoError } from "mongodb";

export class AgencyController {
	getAll = (req: express.Request, res: express.Response) => {
		UserModel.find(
			{ type: 1 },
			{ username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1 },
			(err: MongoError, agencies) => {
				if (err) {
					console.log(err);
					res.status(404).json({ msg: "Agencija ne postoji!" });
				} else res.status(200).json(agencies);
			}
		);
	};

	getOne = (req: express.Request, res: express.Response) => {
		UserModel.find(
			{ type: 1, username: req.query.username },
			{ username: 1, agencyName: 1, street: 1, desc: 1, profilePic: 1 },
			(err: MongoError, agencies) => {
				if (err) {
					console.log(err);
					res.status(404).json({ msg: "Agencija ne postoji!" });
				} else res.status(200).json(agencies);
			}
		);
	};

	getOneFull = (req: express.Request, res: express.Response) => {
		UserModel.findOne(
			{ type: 1, username: req.query.username },
			(err: MongoError, agencies) => {
				if (err) {
					console.log(err);
					res.status(404).json({ msg: "Agencija ne postoji!" });
				} else res.status(200).json(agencies);
			}
		);
	};

	updateOne = (req: express.Request, res: express.Response) => {
        let updateBlock = {};
        if(req.body.agencyName != null)
            updateBlock['agencyName'] = req.body.agencyName;
        if(req.body.country != null)
            updateBlock['country'] = req.body.country;
        if(req.body.city != null)
            updateBlock['city'] = req.body.city;
        if(req.body.street != null)
            updateBlock['street'] = req.body.street;
        if(req.body.email != null)
            updateBlock['email'] = req.body.email;
        if(req.body.desc != null)
            updateBlock['desc'] = req.body.desc;
        if(req.body.phoneNum != null)
            updateBlock['phoneNum'] = req.body.phoneNum;
        if(req.body.profilePic != null)
            updateBlock['profilePic'] = req.body.profilePic;


        UserModel.findOneAndUpdate(
			{ username: req.query.username },
			{ "$set": updateBlock },
			(err: MongoError, docs) => {
                if(docs == null || err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greske, pokušajte ponovo!" });
				} else {
                    console.log(docs);
					res.status(200).json(docs);
				}
			}
		);
    }
}
