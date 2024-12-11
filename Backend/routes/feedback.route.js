import express from "express";
import { addFeedback, getAllFeedback, getFeedbackByComplaint } from "../controllers/feedback.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-feedback/:complaintId", auth, addFeedback);
router.get("/getAll-feedback", auth, getAllFeedback);
router.get("/get-feedback/:complaintId", auth, getFeedbackByComplaint);

export default router;