import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/db.js'
import cloud from './db/cloudinary.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'
dotenv.config()
// import router from './router.js'
const app = express()
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser())
app.use(express.json());
import auth from "./routes/auth.route.js"
import complaint from "./routes/complaint.route.js"
import user from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import department from "./routes/department.route.js"
import feedback from "./routes/feedback.route.js"

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Mounting Api routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/complaint", complaint);
app.use("/api/v1/user", user);
app.use('/api/v1/department', department);
app.use('/api/v1/feedback', feedback);

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h2>")
})
// cloudinary connection
cloud()

//DB connection
connectDB().then(() => {
    app.on("error", () => {
        console.log("Express app not able to talk: ", error)
        throw error
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server is listning at ${process.env.PORT}`)
    })

}).catch(err => {
    console.log("MongoDb connection Error!! ", err)
})



