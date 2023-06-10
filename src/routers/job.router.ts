import express from "express";
import { JobController } from "../controllers/job.controller";


const jobRouter = express.Router();

jobRouter
	.route("/")
	.post((req, res) => new JobController().addOne(req, res));
    jobRouter
	.route("/")
	.get((req, res) => new JobController().getAllForUser(req, res));

export default jobRouter;