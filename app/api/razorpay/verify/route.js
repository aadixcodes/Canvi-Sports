import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    // Log received values for debugging
    console.log('Received:', { razorpay_order_id, razorpay_payment_id, razorpay_signature });
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    // Log generated signature for debugging
    console.log('Generated signature:', generated_signature);
    if (generated_signature === razorpay_signature) {
        return NextResponse.json({
            message: "Payment verified successfully",
            success: true,
        }, { status: 200 });
    }
    // Log error for debugging
    console.error('Signature mismatch', {
        expected: generated_signature,
        received: razorpay_signature
    });
    return NextResponse.json({
        message: "Payment verification failed. Signature mismatch.",
        success: false,
        debug: {
            expected: generated_signature,
            received: razorpay_signature
        }
    }, { status: 400 });
}