"use server";

import nodemailer from "nodemailer";
import { config } from "./config";
import { createVerificationToken } from "./generate-verification-token";

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

export default async function sendUserEmail({
  html,
  subject,
  to,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const mailOptions = {
      from: config.env.email.emailId,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export const sendVerificationEmail = async ({ to }: { to: string }) => {
  const token = createVerificationToken(to);

  const verificationUrl = `${process.env.NODE_ENV === "development" ? config.env.apiEndpoint : config.env.prodApiEndpoint}/api/verify-email?token=${token}`;

  const html = `
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Click here</a>`;

  const mailOptions = {
    from: config.env.email.emailId,
    to,
    subject: "Verify your email address",
    html: html,
  };

  await transporter.sendMail(mailOptions);
};
