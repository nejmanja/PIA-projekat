import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/").get((req, res) => new UserController().getOne(req, res));
userRouter.route("/").patch((req, res) => new UserController().updateOne(req, res));

userRouter
	.route("/login")
	.post((req, res) => new UserController().login(req, res));

userRouter
	.route("/register")
	.post((req, res) => new UserController().register(req, res));

userRouter
    .route("/changePassword")
    .put((req, res) => new UserController().changePassword(req, res));

export default userRouter;