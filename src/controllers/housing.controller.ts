import express from "express";
import HousingModel from "../models/housing";
import JobModel from "../models/job";
import { MongoError } from "mongodb";

export class HousingController {
	getForUser = async (req: express.Request, res: express.Response) => {
		try {
			let docs = await HousingModel.find({ owner: req.query.username });
            let result = [];
            for (let i = 0; i < docs.length; i++) {
                const doc = docs[i];
                const cnt = await JobModel.countDocuments({
                    housingId: doc._id,
                    status: { $ne: "finished" },
                });
                result.push({...doc['_doc'], numOngoingJobs: cnt});
            }

            console.log(result)

            res.status(200).json(result);
		} catch (err) {
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	getOne = async (req: express.Request, res: express.Response) => {
		try {
			let doc = await HousingModel.findById(req.query.id);
			const cnt = await JobModel.countDocuments({
				housingId: doc._id,
				status: { $ne: "finished" },
			});

			doc['_doc']["numOngoingJobs"] = cnt;
			res.status(200).json(doc);
		} catch (err) {
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
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

	countOngoingJobs = (req: express.Request, res: express.Response) => {};
}
