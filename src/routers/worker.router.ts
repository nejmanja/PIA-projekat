import express from "express";
import { WorkerController } from "../controllers/worker.controller";

const workerRouter = express.Router();

workerRouter
	.route("/")
	.get((req, res) => new WorkerController().getForAgency(req, res));
workerRouter
	.route("/")
	.patch((req, res) => new WorkerController().updateOne(req, res));
workerRouter
	.route("/")
	.post((req, res) => new WorkerController().addOneWithDecrement(req, res));
workerRouter
	.route("/adminAdd")
	.post((req, res) => new WorkerController().addOne(req, res));
workerRouter
	.route("/")
	.delete((req, res) =>
		new WorkerController().removeOneWithIncrement(req, res)
	);
workerRouter
	.route("/adminDelete")
	.delete((req, res) =>
		new WorkerController().removeOne(req, res)
	);

export default workerRouter;
