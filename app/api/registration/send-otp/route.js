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

    // Rate limiting
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

    // ---------------------------
    // OTP EMAIL (PROFESSIONAL HTML)
    // ---------------------------
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:40px;">
        <div style="max-width:600px; margin:auto; background:white; padding:25px 35px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

          <h2 style="text-align:center; color:#29066D; margin-top:0;">
            Email Verification - Canvi Sports
          </h2>

          <p>Dear Player,</p>

          <p>
            Thank you for registering for the <strong>Canvi Pro Kabaddi League</strong>.
            To verify your email address, please use the OTP given below:
          </p>

          <div style="text-align:center; margin:25px 0;">
            <div style="
              display:inline-block;
              font-size:32px;
              letter-spacing:8px;
              font-weight:bold;
              padding:12px 20px;
              background:#29066D;
              color:white;
              border-radius:8px;">
              ${otp}
            </div>
          </div>

          <p style="font-size:15px;">
            This OTP is valid for the next <strong>10 minutes</strong>.<br>
            Please do not share this code with anyone.
          </p>

          <p>
            We look forward to completing your registration process.
          </p>

          <p><strong>For any queries or issues:</strong><br>
            📧 info@canvisports.com<br>
            📞 +91-8696143069
          </p>

          <p>
            Warm regards,<br>
            <strong>Team Canvi Sports</strong>
          </p>
        </div>
      </div>
    `;

    // send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address - Canvi Sports",
      html: htmlContent,
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
