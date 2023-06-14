import express from "express";
import { RequestController } from "../controllers/request.controller";

const requestRouter = express.Router();

requestRouter
	.route("/workers")
	.post((req, res) => new RequestController().addWorkplaceRequest(req, res));
requestRouter
	.route("/workers")
	.get((req, res) => new RequestController().getAllWorkplaceRequests(req, res));
requestRouter
	.route("/workersApprove")
	.patch((req, res) => new RequestController().approveWorkplaces(req, res));
requestRouter
	.route("/workersDeny")
	.patch((req, res) => new RequestController().denyWorkplaces(req, res));
requestRouter
	.route("/register")
	.post((req, res) => new RequestController().addRegistrationRequest(req, res));
requestRouter
	.route("/register")
	.get((req, res) =>
		new RequestController().getAllRegistrationRequests(req, res)
	);
requestRouter
	.route("/registerApprove")
	.patch((req, res) => new RequestController().approveRegistration(req, res));
requestRouter
	.route("/ban")
	.patch((req, res) => new RequestController().banUser(req, res));

export default requestRouter;
