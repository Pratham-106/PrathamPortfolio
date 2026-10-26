
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
      : "http://localhost:5173",
  })
);

app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running." });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 80 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      email.length > 254 ||
      subject.trim().length < 3 ||
      subject.trim().length > 150 ||
      message.trim().length < 10 ||
      message.trim().length > 5000
    ) {
      return res.status(400).json({
        message: "Please enter valid contact details and try again.",
      });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
      process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      return res.status(503).json({
        message: "Email service is not configured yet. Please try again later.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio: ${subject.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        "",
        "Message:",
        message.trim(),
      ].join("\n"),
    });

    return res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact email failed:", error.message);

    return res.status(500).json({
      message: "Unable to send your message right now. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio API listening on port ${PORT}`);
});
