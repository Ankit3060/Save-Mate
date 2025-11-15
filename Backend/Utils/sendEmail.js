// import nodeMailer from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//     console.log(process.env.SMTP_MAIL, process.env.SMTP_PASSWORD)

//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         secure: false,
//         auth: {
//             user: process.env.SMTP_MAIL,
//             pass: process.env.SMTP_PASSWORD
//         }
//     });

//     transporter.verify((error, success) => {
//         if (error) console.error("SMTP connection failed:", error);
//         else console.log("SMTP connected successfully");
//     });


//     const mailOptions = {
//         from: `"SaveMate" <dtspecial330660@gmail.com>`,
//         to: email,
//         subject,
//         html: message
//     }

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.messageId);
// }


import axios from "axios";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "SaveMate",
          email: "dtspecial330660@gmail.com", 
        },
        to: [{ email }],
        subject,
        htmlContent: message,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent:", response.data);
  } catch (error) {
    console.error("Email error:", error.response?.data || error.message);
  }
};
