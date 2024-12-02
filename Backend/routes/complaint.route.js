import express from "express"
import { createComplaint, getAllComplaints } from "../controllers/complaint.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to create a new complaint
router.post('/create', auth, createComplaint)
router.get('/get', auth, getAllComplaints)

export default router;