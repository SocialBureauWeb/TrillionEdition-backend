const express = require("express");
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: "Message saved and email sent!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;