import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
        code:{
            type: String,
            required: true,
            length:6
        },
        email:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true
        },
        expiresAt:{
            type: Date,
            required: true,
            expires: 0
        }

    },
    {
        timestamps:{
            createdAt: "createdAt",
            updatedAt: false,
        }

    }
)
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;