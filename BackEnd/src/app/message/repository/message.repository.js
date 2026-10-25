import  Message from "../model/message.model.js";

export const createMessage = async (content, sender, receiver) => {
    return Message.create({ content, sender, receiver });
}

export const getAllMessages = async (userId) => {
    return Message.find(
        {
        receiver : userId
    } , {
        omit:password

    } , {
        populate : {path:"sender"}
    })
}