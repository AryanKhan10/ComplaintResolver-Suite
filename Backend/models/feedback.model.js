import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {

        feedback:{
            type: String,
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        complaintId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true
        },
        
        // further addition can be made in the future
    },{timestamps: true}
);

export const Feedback = mongoose.model("Feedback", feedbackSchema)