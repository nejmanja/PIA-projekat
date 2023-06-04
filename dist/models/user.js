"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    type: {
        type: Number,
        required: true
    },
    // user
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    // agency
    agencyName: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    agencyNum: {
        type: String
    },
    desc: {
        type: String
    },
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
//# sourceMappingURL=user.js.map