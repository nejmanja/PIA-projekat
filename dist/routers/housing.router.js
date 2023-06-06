"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const housing_controller_1 = require("../controllers/housing.controller");
const housingRouter = express_1.default.Router();
housingRouter
    .route("/")
    .get((req, res) => new housing_controller_1.HousingController().getForUser(req, res));
housingRouter
    .route("/")
    .put((req, res) => new housing_controller_1.HousingController().addOne(req, res));
housingRouter
    .route("/id")
    .get((req, res) => new housing_controller_1.HousingController().getOne(req, res));
housingRouter
    .route("/id")
    .delete((req, res) => new housing_controller_1.HousingController().removeOne(req, res));
exports.default = housingRouter;
//# sourceMappingURL=housing.router.js.map