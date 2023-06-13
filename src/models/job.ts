import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Job = new Schema({
    owner: { // username of housing owner
        type: String,
        required: true
    },
    agency: { // username of agency responsible for the job
        type: String,
        required: true
    },
    housingId: { // the housing on which the job will be done
        type: ObjectId,
        required: true
    },
    status: { // requested/pending/denied/starting/started/finished
        type: String,
        required: true
    },
    compensation: {
        type: Number
    },
    roomStatus:{
        type: Array,
        required: true
    },
});

export default mongoose.model('JobModel', Job, 'jobs');