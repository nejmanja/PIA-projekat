"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const agencyRouter = express_1.default.Router();
agencyRouter
    .route("/")
    .get((req, res) => req.query.username ? new agency_controller_1.AgencyController().getOne(req, res) : new agency_controller_1.AgencyController().getAll(req, res));
exports.default = agencyRouter;
//# sourceMappingURL=agency.router.js.map