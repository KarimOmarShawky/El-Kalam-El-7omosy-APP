import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: 2,
        trim:true,
        maxLength:20,
    } ,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    } ,
    password:{
        type:String,
        required: function () {
            return this.provider === "local";
            },
    },
    provider:{
        type:String,
        default:"local"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    dateOfBirth:{
        type:Date,
    },
    gender:{
        type: String,
        enum: ["male", "female" , "other"],
    },

},
    {
        timestamps: true
    })
const User = mongoose.model("User", userSchema);
export default User;
