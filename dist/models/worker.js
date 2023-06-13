"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Worker = new Schema({
    agency: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    jobId: {
        type: String
    },
    roomInd: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('WorkerModel', Worker, 'workers');
//# sourceMappingURL=worker.js.map