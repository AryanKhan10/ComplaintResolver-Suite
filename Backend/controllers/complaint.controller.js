import { Complaint } from "../models/complaint.model.js";

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const { title, description, attachment } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }

        // Ensure user ID exists in request
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID is missing.",
            });
        }

        const newComplaint = new Complaint({
            title,
            description,
            status: "pending",
            attachment,
            userId,
        });

        await newComplaint.save();

        res.status(201).json({
            success: true,
            message: "Complaint created successfully.",
            complaint: newComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create complaint.",
            error: error.message,
        });
    }
};

// Fetch all complaints
const getAllComplaints = async (req, res) => {
    try {
        const { accountType, id } = req.user;

        let complaints;
        if (accountType === "Admin") {
            complaints = await Complaint.find();
        } else if (accountType === "Ordinary") {
            complaints = await Complaint.find({ userId: id });
        } else if (accountType === "Agent") {
            complaints = await Complaint.find({ agentId: id });
        } else {
            return res.status(403).json({
                success: false,
                message: "Access forbidden: Unauthorized role.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaints retrieved successfully.",
            complaints,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch complaints.",
            error: error.message,
        });
    }
};

export { createComplaint, getAllComplaints };
