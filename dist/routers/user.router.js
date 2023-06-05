"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route("/").get((req, res) => new user_controller_1.UserController().getOne(req, res));
userRouter.route("/").patch((req, res) => new user_controller_1.UserController().updateOne(req, res));
userRouter
    .route("/login")
    .post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter
    .route("/register")
    .post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter
    .route("/changePassword")
    .put((req, res) => new user_controller_1.UserController().changePassword(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map