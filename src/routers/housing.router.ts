import express from "express";
import { HousingController } from "../controllers/housing.controller";

const housingRouter = express.Router();

housingRouter
	.route("/")
	.get((req, res) => new HousingController().getForUser(req, res));
housingRouter
	.route("/")
	.put((req, res) => new HousingController().addOne(req, res));
housingRouter
	.route("/id")
	.get((req, res) => new HousingController().getOne(req, res));
housingRouter
	.route("/id")
	.delete((req, res) => new HousingController().removeOne(req, res));

export default housingRouter;
