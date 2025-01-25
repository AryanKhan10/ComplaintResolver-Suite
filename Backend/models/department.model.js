import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {

        departmentName: {
            type: String,
            required: true,

        },
        departmentType: {
            type: String,
        },
        departmentLocation: {
            type: String,
            required: true,
        },
        departmentEmployees: {
            type: String,
        },
        departmentHead: {
            type: String,
        },
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },

        // further addition can be made in the future
    }, { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema)