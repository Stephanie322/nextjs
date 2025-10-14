import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendResetEmail = async ({ email, userId }: any) => {
  try {
    // Create a hashed token from userId
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Save the token in forgotPasswordToken fields
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
    });

    // Reset password link
    const resetUrl = `${process.env.DOMAIN}/changepassword?token=${hashedToken}`;

    // Configure nodemailer
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: "tedxvjitstephanie@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password or copy-paste the link below in your browser:<br>${resetUrl}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
