import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';
import cloudinary, { isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
       
        await connectDB();

      
        const formData = await request.formData();
        
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const fatherName = formData.get('fatherName');
        const email = formData.get('email');
        const mobile = formData.get('mobile');
        const state = formData.get('state');
        const district = formData.get('district');
        const terms = formData.get('terms');
        const aadharFile = formData.get('aadharFile');

       
        if (!firstName || !lastName || !fatherName || !email || !mobile || !state || !district) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        if (!terms || terms === 'false') {
            return NextResponse.json(
                { success: false, message: "You must accept the Terms and Conditions" },
                { status: 400 }
            );
        }

       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address" },
                { status: 400 }
            );
        }

      
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid 10-digit mobile number" },
                { status: 400 }
            );
        }

       
        if (!aadharFile || aadharFile.size === 0) {
            return NextResponse.json(
                { success: false, message: "Aadhar card file is required" },
                { status: 400 }
            );
        }

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(aadharFile.type)) {
            return NextResponse.json(
                { success: false, message: "Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed." },
                { status: 400 }
            );
        }


        const maxSize = 5 * 1024 * 1024; 
        if (aadharFile.size > maxSize) {
            return NextResponse.json(
                { success: false, message: "File size exceeds 5MB limit" },
                { status: 400 }
            );
        }

     
        const existingRegistration = await Registration.findOne({
            $or: [
                { email: email.toLowerCase() },
                { mobile: mobile }
            ]
        });

        if (existingRegistration) {
            return NextResponse.json(
                { success: false, message: "A registration with this email or mobile number already exists" },
                { status: 409 }
            );
        }

        if (!isCloudinaryConfigured) {
            return NextResponse.json(
                { success: false, message: "File uploads are temporarily unavailable. Cloudinary is not configured." },
                { status: 500 }
            );
        }

    
        let aadharCardUrl;
        try {
          
            const bytes = await aadharFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
           
            const base64String = buffer.toString('base64');
            const dataUri = `data:${aadharFile.type};base64,${base64String}`;
            
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(dataUri, {
                    folder: 'cpkl-registrations/aadhar-cards',
                    resource_type: 'auto',
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            
            aadharCardUrl = uploadResult.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return NextResponse.json(
                { success: false, message: "Failed to upload Aadhar card. Please try again." },
                { status: 500 }
            );
        }

        const registration = await Registration.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            fatherName: fatherName.trim(),
            email: email.toLowerCase().trim(),
            mobile: mobile.trim(),
            state: state.trim(),
            district: district.trim(),
            aadharCardUrl: aadharCardUrl,
            termsAccepted: true,
            status: 'pending'
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registration submitted successfully",
                data: registration
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        await connectDB();

        // Pagination params
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        // Fetch paginated data
        const [registrations, total] = await Promise.all([
            Registration.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            Registration.countDocuments()
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Registrations retrieved successfully",
                data: registrations,
                total,
                page,
                limit
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get registrations error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

