import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            required: true,
        },
        attachment:{
            type: String, // cloudinary url
        },
        status:{
            type: String,
            enum:["pending", "progress", "closed"],
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        resolutionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resolution",
        },
        feedbackId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
        },
        

    },{timestamps: true}
);

export const Complaint = mongoose.model("Complaint", complaintSchema)