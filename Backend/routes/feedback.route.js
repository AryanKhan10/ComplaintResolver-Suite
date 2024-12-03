import express from "express";
import { addFeedback, getAllFeedback, getFeedbackByComplaint } from "../controllers/feedbackControllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/feedback/:complaintId", auth, addFeedback);
router.get("/feedback", auth, getAllFeedback);
router.get("/feedback/:complaintId", auth, getFeedbackByComplaint);

export default router;