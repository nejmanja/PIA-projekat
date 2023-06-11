"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let WorkplaceRequest = new Schema({
    agency: {
        type: String,
        required: true
    },
    numWorkplaces: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('WorkplaceRequestModel', WorkplaceRequest, 'requests');
//# sourceMappingURL=workplace-request.js.map