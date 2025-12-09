import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { keyframes } from "framer-motion";

export async function POST(req){
    try{
        const {amount} = await req.json();
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount,
            currency:"INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({
            order,
            key: process.env.RAZORPAY_KEY_ID,
            success:true,  
        },
        {status:200}
    );
    }   
    catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Failed to create order",
            success:false,
        },{status:500});
    }
}