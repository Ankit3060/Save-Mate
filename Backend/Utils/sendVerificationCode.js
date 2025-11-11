import {generateVerificationOtpEmailTemplate} from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export const sendVerificationCode = async (verificationCode, email) => {
  try {
    const message = generateVerificationOtpEmailTemplate(verificationCode);
    await sendEmail({
      email,
      subject: "Your Verification Code",
      message,
    });
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification code:", error);
  }
};
