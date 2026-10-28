import Request from "../model/request.model.js";
export const getRequestById = async (requestId) => {
    const request = await Request.findById(requestId)
        .populate('message')    
        .populate('sender')
        .populate('receiver');
    return request;
};

export const checkRequestExists = async (messageId, receiverId) => {
    const request = await Request.findOne({ message: messageId, receiver: receiverId });
    return request;
}

export const createRequest = async (messageId, senderId, receiverId) => {
    const request = await Request.create({
        message: messageId,
        sender: senderId,
        receiver: receiverId,
    });
    return request;
};

export const getRequests = async (messageAuthorId) => {
    const requests = await Request.find({ receiver: messageAuthorId, isDeleted: false })
        .populate('message')
        .populate({ path: 'sender', select: 'name' });
    return requests;
}

export const findRequestById = async (requestId) => {
    const request = await Request.findOne({ _id: requestId, isDeleted: false });
    return request;
}

export const updateRequestStatus = async (requestId, receiverId, status) => {
    const request = await Request.findOneAndUpdate(
        { _id: requestId, receiver: receiverId, status: "pending", isDeleted: false },
        { status },
        { returnDocument: "after" },
    );
    return request;
}