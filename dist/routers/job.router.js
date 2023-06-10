"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const jobRouter = express_1.default.Router();
jobRouter
    .route("/")
    .post((req, res) => new job_controller_1.JobController().addOne(req, res));
exports.default = jobRouter;
//# sourceMappingURL=job.router.js.map