import mongoose, {Schema} from "mongoose";
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500,
        trim: true,
    },
    receiver:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true
    }
)
const Message = mongoose.model("Message", messageSchema);
export default Message;