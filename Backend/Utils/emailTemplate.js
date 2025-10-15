export const generateVerificationOtpEmailTemplate = (otpCode) => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - SaveMate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">SaveMate</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Thank you for choosing SaveMate. To complete your registration and secure your account, please use the verification code below:
                            </p>
                        </td>
                    </tr>
                    
                    <!-- OTP Code -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;" align="center">
                            <table role="presentation" style="border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 20px 40px;">
                                        <span style="font-size: 36px; font-weight: 700; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otpCode}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Additional Info -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                This code will expire in <strong>15 minutes</strong> for security reasons.
                            </p>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                If you didn't request this verification code, please ignore this email or contact our support team if you have concerns.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Security Notice -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #fff3cd; border-left: 4px solid #ffc107; margin: 0 40px;">
                            <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
                                <strong>Security Tip:</strong> Never share this code with anyone. SaveMate will never ask for your verification code via phone or email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">
                                Need help? Contact us at <a href="mailto:dtspecial330660@gmail.com" style="color: #667eea; text-decoration: none;">dtspecial330660@gmail.com</a>
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2025 SaveMate. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}



export const generatePasswordResetEmailTemplate = (resetPasswordUrl) => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - SaveMate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">SaveMate</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                We received a request to reset the password for your SaveMate account. Click the button below to create a new password:
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Reset Button -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;" align="center">
                            <table role="presentation" style="border-collapse: collapse;">
                                <tr>
                                    <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                        <a href="${resetPasswordUrl}" style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Alternative Link -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                If the button above doesn't work, copy and paste this link into your browser:
                            </p>
                            <p style="margin: 0 0 15px 0; word-break: break-all;">
                                <a href="${resetPasswordUrl}" style="color: #667eea; text-decoration: none; font-size: 13px;">${resetPasswordUrl}</a>
                            </p>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                This password reset link will expire in <strong>1 hour</strong> for security reasons.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Security Notice -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #fff3cd; border-left: 4px solid #ffc107; margin: 0 40px;">
                            <p style="margin: 0 0 10px 0; color: #856404; font-size: 13px; line-height: 1.5;">
                                <strong>Security Alert:</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                            </p>
                            <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
                                If you're concerned about your account security, please contact our support team immediately.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">
                                Need help? Contact us at <a href="mailto:dtspecial330660@gmail.com" style="color: #667eea; text-decoration: none;">dtspecial330660@gmail.com</a>
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2025 SaveMate. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}