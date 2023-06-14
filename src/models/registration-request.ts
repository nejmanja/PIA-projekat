import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RegistrationRequest = new Schema({
    reqType: {
        type: String,
        required: true
    },
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
    workplaces: {
        type: Number
    },
});

export default mongoose.model('RegistrationRequestModel', RegistrationRequest, 'requests');