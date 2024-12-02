import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import complaintRoute from "./routes/complaint.route.js";
import auth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/complaints", complaintRoute); // Complaints routes

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

// Database Connection and Server Start
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express app encountered an error:", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
