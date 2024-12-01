import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {

        departmentName:{
            type: String,
            required: true,

        },
        agentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },
        
        // further addition can be made in the future
    },{timestamps: true}
);

export const Department = mongoose.model("Department", departmentSchema)