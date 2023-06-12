"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Job = new Schema({
    owner: {
        type: String,
        required: true
    },
    agency: {
        type: String,
        required: true
    },
    housingId: {
        type: mongodb_1.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    compensation: {
        type: Number
    },
    roomStatus: {
        type: [{
                status: String
            }],
        required: true
    },
});
exports.default = mongoose_1.default.model('JobModel', Job, 'jobs');
//# sourceMappingURL=job.js.map