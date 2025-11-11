import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    console.log(process.env.SMTP_MAIL, process.env.SMTP_PASSWORD)

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.verify((error, success) => {
        if (error) console.error("SMTP connection failed:", error);
        else console.log("SMTP connected successfully");
    });


    const mailOptions = {
        from: `"SaveMate" <dtspecial330660@gmail.com>`,
        to: email,
        subject,
        html: message
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
}