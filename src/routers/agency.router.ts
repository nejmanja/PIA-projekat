import express from "express";
import { AgencyController } from "../controllers/agency.controller";

const agencyRouter = express.Router();

agencyRouter
	.route("/")
	.get((req, res) =>
		req.query.username
			? new AgencyController().getOne(req, res)
			: new AgencyController().getAll(req, res)
	);
agencyRouter
	.route("/full")
	.get((req, res) => new AgencyController().getOneFull(req, res));
agencyRouter
	.route("/")
	.patch((req, res) => new AgencyController().updateOne(req, res));
agencyRouter
	.route("/")
	.delete((req, res) => new AgencyController().deleteOne(req, res));

export default agencyRouter;
