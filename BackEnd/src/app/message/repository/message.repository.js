import  Message from "../model/message.model.js";

export const createMessage = async (content, sender, receiver, messageType) => {
    return Message.create({ content, sender, receiver, messageType });
}

export const getAllMessages = async (userId) => {
    const messages = await Message.find({
        receiver: userId,
        isDeleted: false,
    }).populate({
        path: "sender",
        select: "name",
    });

    return messages.map((message) => {
        const result = message.toObject();
        if (result.messageType !== "public") {
            result.sender = null;
        }
        return result;
    });
}

export const findMessageById = async (messageId) => {
    return Message.findOne({ _id: messageId, isDeleted: false });
}

export const makeMessagePublic = async (messageId, senderId) => {
    return Message.findOneAndUpdate(
        {
            _id: messageId,
            sender: senderId,
            $or: [
                { messageType: "anonymous" },
                { messageType: { $exists: false } },
            ],
            isDeleted: false,
        },
        { messageType: "public" },
        { returnDocument: "after" },
    );
}