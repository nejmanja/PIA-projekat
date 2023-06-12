"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const reviewRouter = express_1.default.Router();
reviewRouter
    .route("/")
    .post((req, res) => new review_controller_1.ReviewController().addOne(req, res));
reviewRouter
    .route("/")
    .get((req, res) => new review_controller_1.ReviewController().getOne(req, res));
reviewRouter
    .route("/")
    .patch((req, res) => new review_controller_1.ReviewController().updateOne(req, res));
reviewRouter
    .route("/")
    .delete((req, res) => new review_controller_1.ReviewController().deleteOne(req, res));
reviewRouter
    .route("/agency")
    .get((req, res) => new review_controller_1.ReviewController().getAllForAgency(req, res));
exports.default = reviewRouter;
//# sourceMappingURL=review.router.js.map