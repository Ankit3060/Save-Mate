import { User } from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendToken } from "../Utils/sendToken.js";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { sendVerificationCode } from "../Utils/sendVerificationCode.js";
import { sendPasswordResetCode } from "../Utils/sendPasswordResetCode.js";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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
        user.otpGenerated += 1;
        user.lastOtpTime = Date.now();

        await user.save();

        sendVerificationCode(verificationCode, email, res);
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



export const registerUserGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Google token missing",
            });
        }

        // verify Google ID token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        // find or create user
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                authType: "Google",
                accountVerified: true,
                avatar: {
                    public_id: null,
                    url: picture,
                },
            });
        } else if (user.authType === "Local") {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message:
                    "Account already exists with this email. Please login using password.",
            });
        }

        await sendToken(user, 200, "Google login successful", res);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const loginUserLocal = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide email and password"
            })
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Invalid email or password"
            })
        }

        await sendToken(user, 200, "Login successful", res);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}



export const logoutUser = async (req, res) => {
    try {
        if (req.user) {
            await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
        }

        return res.status(200).cookie("refreshToken", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).json({
            statusCode: 200,
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}



export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide email and OTP"
            })
        }

        const user = await User.findOne({ email, accountVerified: false });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User not found or already verified"
            })
        }

        if (user.otpFailedAttempt >= 5) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Too many failed OTP attempts. Please try 1hr later."
            })
        }

        if (!user.verificationCode || user.verificationCode !== Number(otp)) {
            user.otpFailedAttempt += 1;
            await user.save();
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Invalid OTP"
            })
        }

        const currentTime = Date.now();
        const otpExpirationTime = new Date(user.verificationCodeExpires).getTime();

        if (otpExpirationTime < currentTime) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "OTP expired. Please request for new OTP"
            })
        }


        user.accountVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        user.otpFailedAttempt = undefined;

        await user.save({ validateModifiedOnly: true });

        sendToken(user, 200, "Account verified successfully", res);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}



export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide email"
            })
        }

        const user = await User.findOne({ email, accountVerified: false });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User not found or already verified"
            })
        }

        if (user.otpGenerated >= 5) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Maximum OTP limit reached. Please try again after 1 hours"
            })
        }

        const verificationCode = await user.generateVerificationCode();
        user.otpGenerated += 1;
        user.lastOtpTime = Date.now();
        await user.save();

        sendVerificationCode(verificationCode, email, res);
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



export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide email"
            })
        }

        const user = await User.findOne({ email, accountVerified: true });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User not found or not verified"
            })
        }

        if (user.resetTokenGeneratedTime >= 5) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Maximum reset password token limit reached. Please try again after 1 hours"
            })
        }

        const resetToken = await user.getResetPasswordToken();
        user.resetTokenGeneratedTime += 1;
        user.lastResetTokenTime = Date.now();
        await user.save();

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        sendPasswordResetCode(resetPasswordUrl, email, res);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Reset password link sent to email",
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}



export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;

        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({ resetPasswordToken, resetPasswordTokenExpire: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Reset token is invalid or expired"
            })
        }

        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Please provide password and confirm password"
            })
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

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save();

        sendToken(user, 200, "Password reset successfully", res);

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}



export const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "unauthorized request"
            })
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_KEY);
        const userId = decoded?.id || decoded?._id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Invalid refresh token"
            })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Refresh Token is expired or invalid"
            })
        }

        const accessToken = user.generateAccessToken();
        user.password = undefined;
        
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Token refreshed successfully",
            user,
            accessToken
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}