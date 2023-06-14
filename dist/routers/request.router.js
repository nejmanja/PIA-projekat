"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const requestRouter = express_1.default.Router();
requestRouter
    .route("/workers")
    .post((req, res) => new request_controller_1.RequestController().addWorkplaceRequest(req, res));
requestRouter
    .route("/workers")
    .get((req, res) => new request_controller_1.RequestController().getAllWorkplaceRequests(req, res));
requestRouter
    .route("/workersApprove")
    .patch((req, res) => new request_controller_1.RequestController().approveWorkplaces(req, res));
requestRouter
    .route("/workersDeny")
    .patch((req, res) => new request_controller_1.RequestController().denyWorkplaces(req, res));
requestRouter
    .route("/register")
    .post((req, res) => new request_controller_1.RequestController().addRegistrationRequest(req, res));
requestRouter
    .route("/register")
    .get((req, res) => new request_controller_1.RequestController().getAllRegistrationRequests(req, res));
requestRouter
    .route("/registerApprove")
    .patch((req, res) => new request_controller_1.RequestController().approveRegistration(req, res));
requestRouter
    .route("/ban")
    .patch((req, res) => new request_controller_1.RequestController().banUser(req, res));
exports.default = requestRouter;
//# sourceMappingURL=request.router.js.map