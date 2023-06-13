"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const jobRouter = express_1.default.Router();
jobRouter.route("/").post((req, res) => new job_controller_1.JobController().addOne(req, res));
jobRouter
    .route("/")
    .get((req, res) => new job_controller_1.JobController().getAllForUser(req, res));
jobRouter
    .route("/")
    .delete((req, res) => new job_controller_1.JobController().deleteOne(req, res));
jobRouter
    .route("/agency")
    .get((req, res) => new job_controller_1.JobController().getAllForAgency(req, res));
jobRouter
    .route("/status")
    .patch((req, res) => new job_controller_1.JobController().updateStatus(req, res));
jobRouter
    .route("/accept")
    .patch((req, res) => new job_controller_1.JobController().accept(req, res));
jobRouter.route("/id").get((req, res) => new job_controller_1.JobController().getOne(req, res));
jobRouter
    .route("/room")
    .patch((req, res) => new job_controller_1.JobController().finishRoom(req, res));
exports.default = jobRouter;
//# sourceMappingURL=job.router.js.map