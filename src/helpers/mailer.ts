import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string | number;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const pagePath = emailType === "VERIFY" ? "verifyemail" : "changepassword";

    const mailOptions = {
      from: "tedxvjitstephanie@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
        Click <a href="${process.env.DOMAIN}/${pagePath}?token=${hashedToken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } or copy-paste the link below in your browser:
        <br>${process.env.DOMAIN}/${pagePath}?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to send email");
    }
  }
};

