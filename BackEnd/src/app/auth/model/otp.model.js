import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
        code: {
            type: String,
            required: true,
            length: 6
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0
        }

    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: false,
        }

    }
)
otpSchema.pre("save", async function () {
    if (this.isNew) {
        await this.constructor.deleteMany(
            {
                email: this.email
            }
        )
    }
})

export const OTP = mongoose.model("OTP", otpSchema);
