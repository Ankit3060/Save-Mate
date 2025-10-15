import {
    registerUserLocal,
    registerUserGoogle,
    loginUserLocal,
    logoutUser,
    verifyOTP,
    resendOTP,
    forgetPassword,
    resetPassword,
    refreshAccessToken
} from "../Controller/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUserLocal);
router.post("/google", registerUserGoogle);
router.post("/login", loginUserLocal);
router.post("/logout", logoutUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);


export default router;