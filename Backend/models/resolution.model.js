import mongoose from "mongoose";

const resolutionSchema = new mongoose.Schema(
    {

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

export const Resolution = mongoose.model("Resolution", resolutionSchema)