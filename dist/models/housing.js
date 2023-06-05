"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Housing = new Schema({
    owner: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numRooms: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    area: {
        type: Number,
        min: 1,
        required: true
    },
    rooms: {
        type: [{
                x: Number,
                y: Number,
                w: Number,
                h: Number
            }],
        required: true
    },
    doors: {
        type: [{
                x: Number,
                y: Number,
            }],
    }
});
exports.default = mongoose_1.default.model('HousingModel', Housing, 'housing');
//# sourceMappingURL=housing.js.map