import { NextResponse } from "next/server";

const otpStore = global.otpStore || (global.otpStore = new Map());

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({
        success: false,
        message: "OTP required",
      },
    {status:400}
);
    }

    const record = otpStore.get(email);
    if (!record) {
      return NextResponse.json({
        success: false,
        message: "No OTP request found for this email",
      },
      { status: 400 }
    );
    }
    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }
    console.log("Stored OTP:", record.otp, "Provided OTP:", otp);
    if(record.otp !== otp){
        return NextResponse.json({
            success: false,
            message: "Invalid OTP",
        },
      {status:400}
      );
    }
    otpStore.delete(email);
    return NextResponse.json({
        success: true,
        message: "OTP verified successfully",

    },
    {status:200}
)
  } 
  catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
