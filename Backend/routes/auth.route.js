import express from "express"
const router = express.Router()
import {sendOTP, signup, login} from "../controllers/auth.controller.js"
router.post("/sendOTP" ,sendOTP)
router.post("/signup" ,signup)
router.post("/login" ,login)


export default router;