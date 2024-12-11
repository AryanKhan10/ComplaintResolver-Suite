import { Feedback } from "../models/feedback.model.js";
import { Complaint } from "../models/complaint.model.js";

// Add feedback for a specific complaint
const addFeedback = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { feedback } = req.body;
        const userId = req.user.userId; // Assuming `req.user` contains authenticated user's details

        // Check if the complaint exists and was filed by the user
        const complaint = await Complaint.findOne({ _id: complaintId, userId });
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found or unauthorized to add feedback.",
            });
        }

        // Add feedback
        const newFeedback = await Feedback.create({
            feedback,
            userId,
            complaintId,
        });

        res.status(201).json({
            success: true,
            message: "Feedback added successfully.",
            feedback: newFeedback,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add feedback.",
            error: error.message,
        });
    }
};

// Fetch all feedback (Admin only)
const getAllFeedback = async (req, res) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access forbidden: Only Admin can view feedback.",
            });
        }

        const feedbackList = await Feedback.find().populate("userId", "firstName lastName email");
        res.status(200).json({
            success: true,
            message: "Feedback retrieved successfully.",
            feedback: feedbackList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch feedback.",
            error: error.message,
        });
    }
};

// Fetch feedback for a specific complaint
const getFeedbackByComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const feedback = await Feedback.find({ complaintId }).populate("userId", "firstName lastName email");
        if (feedback.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No feedback found for this complaint.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Feedback retrieved successfully.",
            feedback,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch feedback.",
            error: error.message,
        });
    }
};


export { addFeedback, getAllFeedback, getFeedbackByComplaint }