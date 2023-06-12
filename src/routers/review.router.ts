import express from "express";
import { ReviewController } from "../controllers/review.controller";

const reviewRouter = express.Router();

reviewRouter
	.route("/")
	.post((req, res) => new ReviewController().addOne(req, res));
reviewRouter
	.route("/")
	.get((req, res) => new ReviewController().getOne(req, res));
reviewRouter
	.route("/")
	.patch((req, res) => new ReviewController().updateOne(req, res));
reviewRouter
	.route("/")
	.delete((req, res) => new ReviewController().deleteOne(req, res));

export default reviewRouter;
