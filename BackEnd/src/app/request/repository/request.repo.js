import Request from "../model/request.model";
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

export const createRequest = async (messageId, receiverId) => {
    const request = await Request.create({ message: messageId, receiver: receiverId });
    return request;
};

export const getRequests = async (messageSender) => {
    const requests = await Request.find({ sender: messageSender })
        .populate('message')
        .populate('receiver');
    return requests;
}
export const findRequestByMessageAndReceiver = async (messageId, receiverId) => {
    const request = await Request.findOne({ message: messageId, receiver: receiverId });
    return request;
}

export const updateRequestStatus = async (requestId, status) => {
    const request = await Request.findByIdAndUpdate(requestId, { status }, { new: true });
    return request;
}