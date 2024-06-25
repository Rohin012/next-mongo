import User from "@/models/usermodel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sentEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f02531a17ecd27",
        pass: "dff4c3bf3913f4"
      }
    });

    const mailOption = {
      from: "renu@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Email",
      html: `<p>Click<a href=${process.env.domain}/verifyemail?token=${hashedToken}>Here</a>${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Email"
      }</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOption)
    return mailresponse
  } catch (error: any) {
    throw new Error(error.message);
  }
};
