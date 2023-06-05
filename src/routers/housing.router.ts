import express from "express";
import { HousingController } from "../controllers/housing.controller";

const housingRouter = express.Router();

housingRouter
	.route("/")
	.get((req, res) => new HousingController().getForUser(req, res));
housingRouter
    .route("/id")
    .get((req, res) => new HousingController().getOne(req, res));


export default housingRouter;