import mongoose, { Schema } from "mongoose";

const RegistrationSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number']
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    aadharCardUrl: {
        type: String,
        required: true
    },
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});


const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export default Registration;

