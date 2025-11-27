import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const otpStore = global.otpStore || (global.otpStore = new Map());
const rateLimit = global.rateLimit || (global.rateLimit = new Map());

export async function POST(req) {
  try {
    const { email } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    //Rate limiting
    const now = Date.now();
    const lastRequest = rateLimit.get(email);
    if (lastRequest && now - lastRequest < 60 * 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait 1 minute before requesting a new OTP",
        },
        { status: 429 }
      );
    }

    rateLimit.set(email, now);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 }); // valid for 10 minutes

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address - Canvi Sports",
      text: `Dear Player,
                    Thank you for registering for the Canvi Pro Kabaddi League.
                    To verify your email address, please use the OTP given below:
                    Your OTP: ${otp}
                    This OTP is valid for the next 10 minutes.
                    Please do not share this code with anyone.
                    We look forward to completing your registration process.
                    For any queries or issues, feel free to reach out to us:
                    📧 info@canvisports.com
                    📞 +91-8696143069
                    Warm regards,
                    Team Canvi Sports`,
    });
    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Error:", error);

    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
