import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Housing = new Schema({
    owner: { // username of owner
        type: String,
        required: true
    },
    type: { // house/apartment
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
    rooms:{
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

export default mongoose.model('HousingModel', Housing, 'housing');