import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    const { participantIds, message } = await req.json();

    if (
      !participantIds ||
      !Array.isArray(participantIds) ||
      participantIds.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "participantIds must be a non-empty array" },
        { status: 400 }
      );
    }
    if (!message || message.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 }
      );
    }
    const emailList = [];
    await connectDB();
    for (const id of participantIds) {
      try {
        const participant = await Registration.findById(id).select(
          "email -_id"
        );

        if (participant && participant.email) {
          emailList.push(participant.email);
        } else {
          console.log(`Participant not found or missing email: ${id}`);
        }
      } catch (err) {
        console.log(`Invalid participant ID: ${id}`);
      }
    }

    if (emailList.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid participant emails found" },
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

    await transporter.sendMail({
      to: emailList.join(","),
      from: process.env.EMAIL_USER,
      subject: "Important Update from Canvi Sports",
      text: message,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Bulk mails sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in sending bulk mail:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in sending bulk mails",
      },
      { status: 500 }
    );
  }
}
