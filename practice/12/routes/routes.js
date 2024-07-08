import express from "express"
import { LoginController, OTPVerification, signupController } from "../controllers/authController.js";
const router = express.Router()



// AUTH API
router.post("/signup" , signupController)
router.post("/login" , LoginController)
router.post("/otpverification" , OTPVerification)



router.get("/", (request, response) => {
    response.send("HELLO SERVER MVC")
})

export default router