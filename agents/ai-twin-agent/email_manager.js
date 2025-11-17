// Node.js example for managing emails automatically
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, body) {
    let transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        auth: {
            user: "neuroedge@example.com",
            pass: "password123"
        }
    });

    let info = await transporter.sendMail({
        from: '"NeuroEdge AI" <neuroedge@example.com>',
        to: to,
        subject: subject,
        text: body,
    });

    console.log("Email sent:", info.messageId);
}

sendEmail("investor@example.com", "Meeting Update", "Your meeting is scheduled at 10 AM tomorrow.");
