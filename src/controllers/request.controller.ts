import express from "express";
import WorkplaceRequestModel from "../models/workplace-request";
import RegistrationRequestModel from "../models/registration-request";
import UserModel from "../models/user";
import BanModel from "../models/ban";
import { MongoError } from "mongodb";

export class RequestController {
	addWorkplaceRequest = (req: express.Request, res: express.Response) => {
		const wpreq = new WorkplaceRequestModel({
			reqType: "workplace",
			agency: req.body.agency,
			numWorkplaces: req.body.numWorkplaces,
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

	denyWorkplaces = (req: express.Request, res: express.Response) => {
		WorkplaceRequestModel.deleteOne({ _id: req.body.id }, (err, doc) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(doc);
			}
		});
	};

	approveWorkplaces = async (req: express.Request, res: express.Response) => {
		try {
			const wpreq = await WorkplaceRequestModel.findById({ _id: req.body.id });
			const doc = await UserModel.updateOne(
				{ username: wpreq.agency },
				{ $inc: { workplaces: wpreq.numWorkplaces } }
			);
			await WorkplaceRequestModel.deleteOne({ _id: req.body.id });
			res.status(200).json(doc);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	addRegistrationRequest = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			const result = await UserModel.findOne({
				$or: [{ username: req.body.username }, { email: req.body.email }],
			});
			const banResult = await BanModel.findOne({
				$or: [{ username: req.body.username }, { email: req.body.email }],
			});
			if (banResult != null) {
				res.status(400).json({ msg: "Nije Vam dozvoljeno da pravite nalog!" });
			} else if (result != null) {
				res
					.status(400)
					.json({ msg: "Već postoji korisnik sa datim kor. imenom/mejlom!" });
			} else {
				const usrType = req.body.type;
				let user;
				if (usrType == 0) {
					user = new RegistrationRequestModel({
						reqType: "userRegistration",
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
					user = new RegistrationRequestModel({
						reqType: "agencyRegistration",
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
						workplaces: 0,
					});
				}
				await user.save();
				res.status(200).json({ msg: "OK" });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	getAllRegistrationRequests = (
		req: express.Request,
		res: express.Response
	) => {
		RegistrationRequestModel.find(
			{
				$or: [
					{ reqType: "userRegistration" },
					{ reqType: "agencyRegistration" },
				],
			},
			(err, docs) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ msg: "Došlo je do greške, pokušajte ponovo!" });
				} else {
					res.status(200).json(docs);
				}
			}
		);
	};

	getAllWorkplaceRequests = (req: express.Request, res: express.Response) => {
		WorkplaceRequestModel.find({ reqType: "workplace" }, (err, docs) => {
			if (err) {
				console.log(err);
				res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
			} else {
				res.status(200).json(docs);
			}
		});
	};

	approveRegistration = async (req: express.Request, res: express.Response) => {
		try {
			const reg = await RegistrationRequestModel.findOne({
				username: req.body.username,
			});
			if (reg.reqType == "userRegistration") {
				const user = new UserModel({
					username: reg.username,
					password: reg.password,
					phoneNum: reg.phoneNum,
					email: reg.email,
					profilePic: reg.profilePic,
					type: reg.type,
					name: reg.name,
					surname: reg.surname,
				});

				await user.save();
			} else {
				const user = new UserModel({
					username: reg.username,
					password: reg.password,
					phoneNum: reg.phoneNum,
					email: reg.email,
					profilePic: reg.profilePic,
					type: reg.type,
					agencyName: reg.agencyName,
					country: reg.country,
					city: reg.city,
					street: reg.street,
					agencyNum: reg.agencyNum,
					desc: reg.desc,
					workplaces: 0,
				});

				await user.save();
			}
			await RegistrationRequestModel.deleteOne({ username: req.body.username });

			res.status(200).json({ msg: "OK" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};

	banUser = async (req: express.Request, res: express.Response) => {
		try {
			const reg = await RegistrationRequestModel.findOne({
				username: req.body.username,
			});
			const ban = new BanModel({
				username: reg.username,
				email: reg.email,
			});
			const doc = await ban.save();
			await RegistrationRequestModel.deleteOne({ username: req.body.username });

			res.status(200).json(doc);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
		}
	};
}
