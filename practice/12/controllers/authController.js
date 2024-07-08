import UserModel from "../models/userSchema.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { EmailVerificationHtml } from "../templates/index.js"
import OTPModel from "../models/OTPSchema.js"


export const signupController = async (request, response) => {
    // console.log("signupController")

    try {
        // console.log(request.body, "request.body")
        console.log("step 1 ")
        const { fullName, age, phoneNumber, gender, email, password } = request.body

        if (!fullName ||
            !age ||
            !phoneNumber ||
            !gender ||
            !email ||
            !password) {
            response.json({
                message: "required fields are missing!",
                status: false
            })
            return
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await UserModel.findOne({ email })
        // console.log(user, "user")
        if (user) {
            response.json({
                message: "email address already in use!",
                status: false
            })
            return
        }
        // console.log("hashPass", hashPass)
        console.log("step 2 ")

        const obj = {
            ...request.body,
            password: hashPass
        }

        const userResponse = await UserModel.create(obj)
        // console.log("response", userResponse)

        // send otp using promise
        // await SendOTP("firebase.database.auth@gmail.com")

        console.log("step 3 ")

        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            }
        );

        console.log("step 4 ")
        const otp = Math.floor(100000 + Math.random() * 900000);

        await transporter.sendMail({
            from: process.env.email,
            to: email,
            subject: "Email Verfication",
            html: EmailVerificationHtml(otp),
        })
        await OTPModel.create({
            otp,
            email
        })
console.log("step 5 ")
        response.json({
            data: userResponse,
            message: "successfully signup!",
            status: true
        }) 
    } catch (error) {
        response.json({
            message: error.message,
            status: false,
            data: [],
        })
    }
}

export const LoginController = async (request, response) => {
    try {
        const { email, password } = request.body

        if (!email || !password) {
            response.json({
                message: "required fields are missing!",
                status: false
            })
            return
        }


        const user = await UserModel.findOne({ email })
        console.log("user", user)
        if (!user) {
            response.json({
                message: "Email or Password not valid!",
                status: false,
                data: [],
            })
            return
        }

        const comparePass = await bcrypt.compare(password, user.password)
        console.log("comparePass", comparePass)

        if (!comparePass) {
            response.json({
                message: "Email or Password not valid!",
                status: false,
                data: [],
            })
            return
        }
       


        const token = jwt.sign({ _id: user._id , email: user.email }, "PRIVATEKEY")
        response.json({
            message: "user login successfully!",
            status: true,
            data: user,
            token
        })

    } catch (error) {
        response.json({
            message: error.message,
            status: false,
            data: [],
        })
    }
}



export const OTPVerification = async (request, response) => {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            response.json({
                message: "required fields are missing!",
                status: false
            })
            return
        }

        const otpRes = await OTPModel.findOne({ email, otp })
        console.log("otpRes", otpRes)
        if (!otpRes) {
            response.json({
                message: "Invalid OTP!",
                status: false
            })
            return
        }

        if (otpRes.isUsed) {
            response.json({
                message: "Invalid OTP!",
                status: false
            })
            return
        }

        const ress = await OTPModel.findOneAndUpdate({ _id: otpRes._id }, {
            isUsed: true
        })
        console.log("ress", ress)
        response.json({
            message: "OTP Verify!",
            status: true,
            data: []
        })
        // console.log()

    } catch (error) {
        response.json({
            message: error.message,
            status: false,
            data: [],
        })
    }
}

