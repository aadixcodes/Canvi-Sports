import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/db'; 
import Registration from '@/models/Registration'; 

export async function POST(req) {
  try {
    let { email, status, firstName } = await req.json();

    if (!email || !status) {
      return NextResponse.json({
        success: false,
        message: "email and status are required",
      });
    }

    // If firstName is not provided, fetch from DB
    if (!firstName) {
      await dbConnect();
      const reg = await Registration.findOne({ email });
      if (!reg) {
        return NextResponse.json({
          success: false,
          message: "User not found for this email",
        });
      }
      firstName = reg.firstName;
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let subject, text;
    if (status === "approved") {
      subject = "Registration Approved - Welcome to Canvi Sports";
      text = `Dear ${firstName},\n\nCongratulations! 🎉\n\nYour registration for the Canvi Pro Kabaddi League has been successfully approved.\n\nYou are now officially part of the league, and our team will contact you soon with further updates, schedules, and match details.\n\nIf you have any questions or need assistance, feel free to contact us:\n📧 info@canvisports.com\n📞 +91-8696143069\n\nWelcome to the league!\nTeam Canvi Sports`;
    } else {
      subject = "Registration Update - Canvi Sports";
      text = `Dear ${firstName},\n\nWe regret to inform you that your registration for the Canvi Pro Kabaddi League has not been approved at this time.\n\nThank you for your interest and effort. We encourage you to try again in the future.\n\nIf you have any questions, feel free to contact us:\n📧 info@canvisports.com\n📞 +91-8696143069\n\nBest wishes,\nTeam Canvi Sports`;
    }

   const info =  await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
  console.log("Email sent: " + info);
  if(!info) {
    throw new Error("Email not sent");
  }
    return NextResponse.json(
      {
        success: true,
        message: "Status email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending status email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send status email",
      },
      { status: 500 }
    );
  }
}
