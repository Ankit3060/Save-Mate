import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: function () {
            return this.authType === 'Local';
        },
        select: false,
    },
    phone: {
        type: Number,
        required: false,
        unique: true,
    },
    googleId: {
        type: String,
        required: function () {
            return this.authType === 'Google';
        }
    },
    authType: {
        type: String,
        enum: ['Local', 'Google'],
        default: 'Local'
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    avatar: {
        public_id: String,
        url: String,
    },
    notified: {
        type: Boolean,
        default: false
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: Number,
    verificationCodeExpires: Date,
    otpGenerated: {
        type: Number,
        default: 0,
        max: 5
    },
    lastOtpTime: {
        type: Date,
    },
    otpFailedAttempt: {
        type: Number,
        default: 0,
        max: 5
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordTokenExpire: {
        type: Date,
        select: false
    },
    resetTokenGeneratedTime: {
        type: Number,
        default: 0,
        max: 5
    },
    lastResetTokenTime: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });


userSchema.methods.generateVerificationCode = function () {
    function generateRandomSixDigitCode() {
        const firstNumber = Math.floor(Math.random() * 9) + 1;
        const remainingNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        return parseInt(firstNumber + remainingNumber);
    }
    const verificationCode = generateRandomSixDigitCode();
    this.verificationCode = verificationCode;
    this.verificationCodeExpires = Date.now() + 15 * 60 * 1000;

    return verificationCode;
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}



export const User = mongoose.model('User', userSchema);