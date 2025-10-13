import { User } from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendToken } from "../Utils/sendToken.js";
import crypto from "crypto";


export const registerUserLocal = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please fill all the fields"
            })
        }

        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User already exists"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide a valid email address",
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_.-])[A-Za-z\d@$!%*?&^#_.-]{8,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message:
                    "Password must include uppercase, lowercase, number, special character and be 8–20 characters long",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Password and Confirm Password do not match"
            });
        }

        let avatarData = {
            public_id: null,
            url: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(name)}&background=%23ebf4ff&color=%230f4c75&radius=50&fontSize=50`,
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: avatarData,
        });

        const verificationCode = await user.generateVerificationCode();

        await user.save();

        // sendVerificationCode(verificationCode, email, res);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Verification code sent to email",
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}


export const registerUserGoogle = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}