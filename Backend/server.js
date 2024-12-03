import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import complaintRoute from "./routes/complaint.route.js";
import feedbackRoute from "./routes/feedback.route.js";
import auth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/complaints", complaintRoute); // Complaints routes
app.use("/api/v1/feedback", feedbackRoute); // Feedback routes

// Root route
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening at ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.on("error", (error) => {
    console.error("Express app error:", error);
    throw error;
});
