"use server";

import nodemailer from "nodemailer";
import { config } from "./config";

export default async function sendEmail({
  html,
  subject,
  to,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Or your preferred email service
      auth: {
        user: config.env.email.emailId,
        pass: config.env.email.emailPassword,
      },
    });

    const mailOptions = {
      from: config.env.email.emailId,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
