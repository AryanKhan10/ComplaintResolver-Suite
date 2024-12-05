import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/db.js'

dotenv.config()
// import router from './router.js'
const app = express()
app.use(express.json());
import auth from "./routes/auth.route.js"
import complaint from "./routes/complaint.route.js"
import user from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import router from './routes/user.route.js'
import department from "./routes/department.route.js"

app.use('/user', router)
app.use(cookieParser())
app.use('/department', department);

app.use("/api/v1/auth", auth);
app.use("/api/v1/complaint", complaint);
app.use("/api/v1/user", user);

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h2>")
})

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



