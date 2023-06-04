import express from "express";
import { AgencyController } from "../controllers/agency.controller";

const agencyRouter = express.Router();

agencyRouter
	.route("/")
	.get((req, res) => req.query.username ? new AgencyController().getOne(req, res) : new AgencyController().getAll(req, res));

export default agencyRouter;