"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Review = new Schema({
    // username of agency for which the review is written
    agency: {
        type: String,
        required: true,
    },
    // username of user who left the review
    user: {
        type: String,
        required: true,
    },
    // which job was the review left for
    jobId: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("ReviewModel", Review, "reviews");
//# sourceMappingURL=review.js.map