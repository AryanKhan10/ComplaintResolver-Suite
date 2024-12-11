import express from "express"
const router = express.Router()
import {sendOTP} from "../controllers/auth.controller.js"

router.post("/sendOTP" ,sendOTP)

export default router;