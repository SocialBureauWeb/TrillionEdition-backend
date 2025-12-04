import nodemailer from "nodemailer";

export const sendMail = async (name, email, message) => {
  try {
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
      subject: "New Contact Form Message",
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return true;
  } catch (error) {
    console.error("Mail error:", error);
    return false;
  }
};
