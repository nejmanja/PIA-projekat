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
    .post((req, res) => new request_controller_1.WorkplaceRequestController().addOne(req, res));
exports.default = requestRouter;
//# sourceMappingURL=request.router.js.map