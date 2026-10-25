import APPError from "../../utils/appError.js";
import * as requestRepository from "../repository/request.repository.js";
export const createRequest = async (message,sender , receiver) =>{
    // if message is exist and receiver is exist then create request
    const existingRequest = await requestRepository.checkRequestExists(message, receiver);
    if (existingRequest) {
        throw new APPError('Request already exists' ,400);
    }
    const request = await requestRepository.createRequest(message, sender, receiver);
    return request;

    // create request

}
export const getRequests = async (messageSender) => {
    return await requestRepository.getRequests(messageSender);
};

export const changeRequestStatus = async (message , receiver, status) => {
    const request = await requestRepository.findRequestByMessageAndReceiver(message, receiver);
    if (!request) {
        throw new APPError('Request not found', 404);
    }
    const updatedRequest = await requestRepository.updateRequestStatus(request._id, status);
    return updatedRequest;
}
