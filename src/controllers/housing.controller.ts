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

	updateOne = (req: express.Request, res: express.Response) => {
		let updateBlock = {};
		if (req.body.type != null) updateBlock["type"] = req.body.type;
		if (req.body.address != null) updateBlock["address"] = req.body.address;
		if (req.body.numRooms != null) updateBlock["numRooms"] = req.body.numRooms;
		if (req.body.rooms != null) updateBlock["rooms"] = req.body.rooms;
		if (req.body.doors != null) updateBlock["doors"] = req.body.doors;
		if (req.body.area != null) updateBlock["area"] = req.body.area;
		HousingModel.findByIdAndUpdate(
			req.query.id,
			{ $set: updateBlock },
			(err: MongoError, docs) => {
				if (docs == null || err) {
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
	};
}
