import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
		type: ObjectId,
		required: true,
	},
	rating: {
		type: Number,
	},
	review: {
		type: String,
	},
});

export default mongoose.model("ReviewModel", Review, "reviews");
