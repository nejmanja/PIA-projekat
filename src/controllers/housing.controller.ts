import express from "express";
import HousingModel from "../models/housing";
import { MongoError } from "mongodb";

export class HousingController {
	getForUser = (req: express.Request, res: express.Response) => {
		HousingModel.find(
			{ owner: req.query.username },
			(err: MongoError, docs) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greške, pokušajte ponovo!" });
				} else res.status(200).json(docs);
			}
		);
	};

	getOne = (req: express.Request, res: express.Response) => {
		HousingModel.findById(req.query.id, (err: MongoError, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};

	addOne = (req: express.Request, res: express.Response) => {
		const newHousing = new HousingModel({
			owner: req.body.owner,
			type: req.body.type,
			address: req.body.address,
			numRooms: req.body.numRooms,
			area: req.body.area,
			rooms: req.body.rooms,
			doors: req.body.doors,
		});
		newHousing.save((err: MongoError, dbres) => {
			if (err) {
                console.log(err);
				res.status(500).json({ msg: "Došlo je do greske, pokušajte ponovo!" });
			} else {
				res.status(200).json({ msg: "OK" });
			}
		});
	};

	removeOne = (req: express.Request, res: express.Response) => {
		HousingModel.findByIdAndRemove(req.query.id, (err: MongoError, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};
}
