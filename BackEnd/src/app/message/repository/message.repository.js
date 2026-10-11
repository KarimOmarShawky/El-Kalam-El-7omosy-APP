import  Message from "../model/message.model.js";

export const createMessage = async (content, sender, receiver) => {
    return Message.create({ content, sender, receiver });
}