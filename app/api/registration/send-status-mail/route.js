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

    // Fetch firstName from DB if not provided
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

    let subject, html;

    // ============================
    // APPROVED MAIL (HTML + Hindi)
    // ============================

    if (status === "approved") {
      subject = "Registration Approved - Welcome to Canvi Sports";

      html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear <strong>${firstName}</strong>,</p>

        <h2 style="color: #23aa5d;">🎉 <span style="background-color: yellow;">Congratulations!</span> 🎉</h2>

        <p>Your registration for the <strong>Canvi Pro Kabaddi League</strong> has been successfully approved.</p>

        <p>You are now officially a part of the league. Our team will contact you soon with schedules and further updates.</p>

        <p><strong>For any queries:</strong><br>
        📧 info@canvisports.com<br>
        📞 +91-8696143069</p>

        <p>Welcome to the league!<br><strong>Team Canvi Sports</strong></p>

        <hr>

        <h3 style="margin-top:20px;">🎉 <span style="background-color: yellow;">बधाई हो!</span> 🎉</h3>
        <p><strong>${firstName}</strong> जी,</p>
        <p>आपका <strong>Canvi Pro Kabaddi League</strong> का रजिस्ट्रेशन सफलतापूर्वक स्वीकृत किया गया है।</p>
        <p>आप अब आधिकारिक रूप से लीग का हिस्सा हैं। जल्द ही आपको शेड्यूल और अन्य जानकारी हमारी टीम द्वारा साझा की जाएगी।</p>

        <p><strong>किसी भी सहायता के लिए:</strong><br>
        📧 info@canvisports.com<br>
        📞 +91-8696143069</p>

        <p>धन्यवाद,<br><strong>Team Canvi Sports</strong></p>
      </div>`;
    } 

    // ============================
    // REJECTED MAIL (HTML + Hindi)
    // ============================

    else {
      subject = "Registration Rejected – Canvi Sports";

      html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear <strong>${firstName}</strong>,</p>

        <h2 style="color:red;">❌ Registration Rejected</h2>

        <p>Your registration for the <strong>Canvi Pro Kabaddi League</strong> has been <strong>rejected</strong>.</p>

        <p><strong>Reason:</strong> 
          <span style="color:red; background-color: yellow; padding: 2px 6px;">
            Due to payment not received
          </span>
        </p>

        <p>If you believe this is a mistake or want clarification, you may contact us:</p>

        <p>📧 info@canvisports.com<br>
        📞 +91-8696143069</p>

        <p>Best wishes,<br><strong>Team Canvi Sports</strong></p>

        <hr>

        <h3 style="margin-top:20px; color:red;">❌ रजिस्ट्रेशन अस्वीकृत</h3>
        <p><strong>${firstName}</strong> जी,</p>

        <p>आपका <strong>Canvi Pro Kabaddi League</strong> का रजिस्ट्रेशन अस्वीकृत कर दिया गया है।</p>

        <p><strong>अस्वीकृति का कारण:</strong>
          <span style="color:red; background-color: yellow; padding: 2px 6px;">
            भुगतान प्राप्त नहीं हुआ
          </span>
        </p>

        <p>यदि आपको लगता है कि यह गलती है या आपको कोई जानकारी चाहिए, तो कृपया हमसे संपर्क करें:</p>

        <p>📧 info@canvisports.com<br>
        📞 +91-8696143069</p>

        <p>धन्यवाद,<br><strong>Team Canvi Sports</strong></p>
      </div>`;
    }

    // SEND EMAIL
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("Email sent: " + info);
    if (!info) {
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
