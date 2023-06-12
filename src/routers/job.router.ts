import express from "express";
import { JobController } from "../controllers/job.controller";

const jobRouter = express.Router();

jobRouter.route("/").post((req, res) => new JobController().addOne(req, res));
jobRouter
	.route("/")
	.get((req, res) => new JobController().getAllForUser(req, res));
jobRouter
	.route("/agency")
	.get((req, res) => new JobController().getAllForAgency(req, res));
jobRouter
	.route("/deny")
	.patch((req, res) => new JobController().deny(req, res));
jobRouter
	.route("/accept")
	.patch((req, res) => new JobController().accept(req, res));
jobRouter.route("/id").get((req, res) => new JobController().getOne(req, res));

export default jobRouter;
