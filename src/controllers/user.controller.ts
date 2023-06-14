import express from "express";
import UserModel from "../models/user";
import { MongoError } from "mongodb";

export class UserController {
	login = (req: express.Request, res: express.Response) => {
		let username = req.body.username;
		let password = req.body.password;
		UserModel.findOne(
			{ username: username, password: password, type: { $ne: -1 } },
			(err, user) => {
				if (err) {
					console.log(err);
					res.status(404).json({ msg: "Korisnik ne postoji!" });
				} else res.status(200).json(user);
			}
		);
	};

	adminLogin = (req: express.Request, res: express.Response) => {
		let username = req.body.username;
		let password = req.body.password;
		UserModel.findOne(
			{ username: username, password: password, type: -1 },
			(err, user) => {
				if (err) {
					console.log(err);
					res.status(404).json({ msg: "Korisnik ne postoji!" });
				} else res.status(200).json(user);
			}
		);
	};

	register = (req: express.Request, res: express.Response) => {
		const usrType = req.body.type;
		let user;
		if (usrType == 0) {
			user = new UserModel({
				username: req.body.username,
				password: req.body.password,
				phoneNum: req.body.phoneNum,
				email: req.body.email,
				type: usrType,
				name: req.body.name,
				surname: req.body.surname,
				profilePic: req.body.profilePic,
			});
		} else {
			user = new UserModel({
				username: req.body.username,
				password: req.body.password,
				phoneNum: req.body.phoneNum,
				email: req.body.email,
				type: usrType,
				agencyName: req.body.agencyName,
				country: req.body.country,
				city: req.body.city,
				street: req.body.street,
				agencyNum: req.body.agencyNum,
				desc: req.body.desc,
				profilePic: req.body.profilePic,
                workplaces: 0
			});
		}

		user.save((err: MongoError, dbres) => {
			if (err) {
				console.log(err);
				if (err.code && err.code == 11000) {
					// duplicate key err
					res
						.status(400)
						.json({ msg: "Već postoji korisnik sa datim kor. imenom/mejlom!" });
				} else {
					// unknown err
					res
						.status(500)
						.json({ msg: "Došlo je do greske, pokušajte ponovo!" });
				}
			} else {
				res.status(200).json({ msg: "OK" });
			}
		});
	};

	changePassword = (req: express.Request, res: express.Response) => {
		const username = req.body.username;
		UserModel.findOneAndUpdate(
			{ username: username, password: req.body.oldPassword },
			{ password: req.body.newPassword },
			(err: MongoError, docs) => {
				if (docs == null) {
					res.status(400).json({ msg: "Neispravna stara lozinka!" });
				} else if (err) {
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

	getOne = (req: express.Request, res: express.Response) => {
		UserModel.findOne(
			{ username: req.query.username, type: 0 },
			{ password: 0 },
			(err, doc) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greske, pokušajte ponovo!" });
				} else {
					res.status(200).json(doc);
				}
			}
		);
	};

	updateOne = (req: express.Request, res: express.Response) => {
		let updateBlock = {};
		if (req.body.name != null) updateBlock["name"] = req.body.name;
		if (req.body.surname != null) updateBlock["surname"] = req.body.surname;
		if (req.body.email != null) updateBlock["email"] = req.body.email;
		if (req.body.phoneNum != null) updateBlock["phoneNum"] = req.body.phoneNum;
		if (req.body.email != null) updateBlock["email"] = req.body.email;
		if (req.body.profilePic != null)
			updateBlock["profilePic"] = req.body.profilePic;

		UserModel.findOneAndUpdate(
			{ username: req.query.username },
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

	getAll = (req: express.Request, res: express.Response) => {
		UserModel.find({ type: 0 }).exec((err, docs) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greske, pokušajte ponovo!" });
			} else {
				res.status(200).json(docs);
			}
		});
	};
	deleteOne = (req: express.Request, res: express.Response) => {
		UserModel.deleteOne(
			{ type: 0, username: req.query.username },
			(err, docs) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greske, pokušajte ponovo!" });
				} else {
					res.status(200).json(docs);
				}
			}
		);
	};
}
