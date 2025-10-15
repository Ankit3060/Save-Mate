import {generateVerificationOtpEmailTemplate} from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";


export const sendVerificationCode = async(verificationCode, email, res)=>{
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject: "Verification Code",
            message
        });
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Verification code sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send verification code. Please try again."
        });
    }
}