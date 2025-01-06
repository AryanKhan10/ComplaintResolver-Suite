// Complaint Routes
// Create a Complaint:
// http://localhost:6000/api/v1/complaints/create

// Get All Complaints:
// http://localhost:6000/api/v1/complaints/get

// Get a Complaint by ID:
// http://localhost:6000/api/v1/complaints/get/:id
// Replace :id with the specific complaint ID.

// Update Complaint Details:
// http://localhost:6000/api/v1/complaints/update/:id
// Replace :id with the specific complaint ID.

// Update Complaint Status:
// http://localhost:6000/api/v1/complaints/update/:id
// Replace :id with the specific complaint ID. (This uses the same route as the update function but calls a different controller.)

// Delete a Complaint:
// http://localhost:6000/api/v1/complaints/delete/:id
// Replace :id with the specific complaint ID.


import express from "express";
import {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaint,
    updateComplaintStatus,
    deleteComplaint,
} from "../controllers/complaint.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
// import multer from "multer";

// // Initialize multer
// const upload = multer({ dest: "../db/uploads" });
// upload.single("attachment"), 
const router = express.Router();

// Route to create a new complaint
router.post('/create', createComplaint);

// Route to get all complaints
router.get('/getAllComplaints', auth, getAllComplaints);

// Route to get a specific complaint by ID
router.get('/getComplaint/:id', auth, getComplaintById);

// Route to update complaint details
router.put('/updateComplaint/:id', auth, updateComplaint);

// Route to update complaint status
router.put('/update-status/:id', auth, updateComplaintStatus);

// Route to delete a complaint
router.delete('/deleteComplaint/:id', auth, deleteComplaint);

export default router;
