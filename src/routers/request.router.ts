import express from "express";
import { WorkplaceRequestController } from "../controllers/request.controller";

const requestRouter = express.Router();

requestRouter
	.route("/workers")
	.post((req, res) => new WorkplaceRequestController().addOne(req, res));

export default requestRouter;