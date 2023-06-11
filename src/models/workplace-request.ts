import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let WorkplaceRequest = new Schema({
    agency: { // username of agency that submitted the request
        type: String,
        required: true
    },
    numWorkplaces: {
        type: Number,
        required: true
    }
});

export default mongoose.model('WorkplaceRequestModel', WorkplaceRequest, 'requests');