import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Worker = new Schema({
    agency: { // who do they work for (username)
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

})

export default mongoose.model('WorkerModel', Worker, 'workers');