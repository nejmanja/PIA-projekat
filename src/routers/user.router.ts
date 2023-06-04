import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

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