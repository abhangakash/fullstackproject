const nodemailer = require("nodemailer");
const EmailLog = require("../models/EmailLog");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email credentials. Check .env configuration.");
    }

    const info = await transporter.sendMail({
      from: `"Your Institute" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    await EmailLog.create({
      to,
      subject,
      status: "Success",
      response: info.response,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Email failed:", error.message);

    await EmailLog.create({
      to,
      subject,
      status: "Failed",
      error: error.message,
    });

    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;