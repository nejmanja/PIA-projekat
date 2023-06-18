"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_controller_1 = require("../controllers/worker.controller");
const workerRouter = express_1.default.Router();
workerRouter
    .route("/")
    .get((req, res) => new worker_controller_1.WorkerController().getForAgency(req, res));
workerRouter
    .route("/")
    .patch((req, res) => new worker_controller_1.WorkerController().updateOne(req, res));
workerRouter
    .route("/")
    .post((req, res) => new worker_controller_1.WorkerController().addOneWithDecrement(req, res));
workerRouter
    .route("/adminAdd")
    .post((req, res) => new worker_controller_1.WorkerController().addOne(req, res));
workerRouter
    .route("/")
    .delete((req, res) => new worker_controller_1.WorkerController().removeOneWithIncrement(req, res));
workerRouter
    .route("/adminDelete")
    .delete((req, res) => new worker_controller_1.WorkerController().removeOne(req, res));
workerRouter
    .route("/done")
    .patch((req, res) => new worker_controller_1.WorkerController().finishWork(req, res));
exports.default = workerRouter;
//# sourceMappingURL=worker.router.js.map