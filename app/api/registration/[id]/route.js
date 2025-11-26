import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
    try {
        await connectDB();

       
        const awaitedParams = typeof params?.then === 'function' ? await params : params;
        const { id } = awaitedParams;
        const { status } = await request.json();

       
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status. Must be 'pending', 'approved', or 'rejected'" },
                { status: 400 }
            );
        }

       
        const registration = await Registration.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!registration) {
            return NextResponse.json(
                { success: false, message: "Registration not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: `Registration ${status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'updated'} successfully`,
                data: registration
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update registration error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const registration = await Registration.findById(id);

        if (!registration) {
            return NextResponse.json(
                { success: false, message: "Registration not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Registration retrieved successfully",
                data: registration
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get registration error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

