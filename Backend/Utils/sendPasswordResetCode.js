import { generatePasswordResetEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export const sendPasswordResetCode = async (resetPasswordUrl, email, res) => {
    try {
        const message = generatePasswordResetEmailTemplate(resetPasswordUrl);
        sendEmail({
            email,
            subject: "Password Reset link",
            message
        });
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send password reset email. Please try again."
        });
    }
}