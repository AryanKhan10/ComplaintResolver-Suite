import { Complaint } from "../models/complaint.model.js";
import fileUpload from "../utiles/uploadFile.js";

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.files.attachment;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID is missing.",
            });
        }
        const upload = await fileUpload(file, process.env.FOLDER)
        const newComplaint = await Complaint.create({
            title,
            description,
            status: "pending",
            attachment:upload.secure_url,
            userId,
        });

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
        const { accountType, userId } = req.user;
        // console.log(userId)
        let complaints;
        if (accountType === "Admin") {
            complaints = await Complaint.find();
        } else if (accountType === "Ordinary") {
            complaints = await Complaint.find({ userId: userId });
            // console.log("abc ")
        } else if (accountType === "Agent") {
            complaints = await Complaint.find({ agentId: userId });
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

// Fetch a specific complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint retrieved successfully.",
            complaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch complaint.",
            error: error.message,
        });
    }
};

// Update a complaint's details
const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { title, description } = req.body;
        const file = req.files.attachment;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        if (complaint.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this complaint.",
            });
        }

        const upload = await fileUpload(file, process.env.FOLDER)

        const updatedComplaint = await Complaint.findByIdAndUpdate(id, 
            {
                title,
                description,
                attachment:upload.secure_url
            }, { new: true });

        res.status(200).json({
            success: true,
            message: "Complaint updated successfully.",
            complaint: updatedComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update complaint.",
            error: error.message,
        });
    }
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const { accountType } = req.user;

        if (!["Admin", "Agent"].includes(accountType)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update complaint status.",
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedComplaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint status updated successfully.",
            complaint: updatedComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update complaint status.",
            error: error.message,
        });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, accountType } = req.user;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        if (complaint.userId.toString() !== userId && accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this complaint.",
            });
        }

        await Complaint.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete complaint.",
            error: error.message,
        });
    }
};

// Export functions
export {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaint,
    updateComplaintStatus,
    deleteComplaint,
};
