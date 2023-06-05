import express from "express";
import HousingModel from "../models/housing";
import { MongoError } from "mongodb";

export class HousingController {
    getForUser = (req: express.Request, res: express.Response) => {
		HousingModel.find({ owner: req.query.username }, (err: MongoError, docs) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else res.status(200).json(docs);
		});
	};

    getOne = (req: express.Request, res: express.Response) => {
        HousingModel.findById(req.query.id, (err: MongoError, doc) => {
            if(err){
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
                res.status(200).json(doc);
            }
        })
    }
}