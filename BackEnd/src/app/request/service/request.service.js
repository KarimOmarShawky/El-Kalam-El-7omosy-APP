import {AppError} from "../../../lib/error/error.js";
import * as requestRepository from "../repository/request.repo.js";
import * as messageRepository from "../../message/repository/message.repository.js";
import * as conversationService from "../../conversation/service/conversation.service.js";

export const createRequest = async (messageId, requesterId) => {
    const message = await messageRepository.findMessageById(messageId);
    if (!message) {
        throw new AppError("Message not found", 404);
    }
    if (message.receiver.toString() !== requesterId) {
        throw new AppError("You can only request the identity of messages you received", 403);
    }
    if (message.messageType === "public") {
        throw new AppError("The message is already public", 400);
    }
    if (!message.sender) {
        throw new AppError("The sender's identity is unavailable for this guest message", 400);
    }

    const messageAuthorId = message.sender.toString();
    const existingRequest = await requestRepository.checkRequestExists(messageId, messageAuthorId);
    if (existingRequest) {
        throw new AppError('Request already exists', 400);
    }
    return requestRepository.createRequest(messageId, requesterId, messageAuthorId);
}

export const getRequests = async (messageAuthorId) => {
    return requestRepository.getRequests(messageAuthorId);
};

export const changeRequestStatus = async (requestId, messageAuthorId, status) => {
    const request = await requestRepository.findRequestById(requestId);
    if (!request) {
        throw new AppError("Request not found", 404);
    }
    if (request.receiver.toString() !== messageAuthorId) {
        throw new AppError("You cannot update this request", 403);
    }
    if (request.status === "rejected" || (request.status !== "pending" && status !== "accepted")) {
        throw new AppError("This request has already been processed", 400);
    }

    let updatedRequest = request;
    if (request.status === "pending") {
        updatedRequest = await requestRepository.updateRequestStatus(
            request._id,
            messageAuthorId,
            status,
        );
        if (!updatedRequest) {
            const latestRequest = await requestRepository.findRequestById(request._id);
            if (!latestRequest || latestRequest.status !== status) {
                throw new AppError("This request has already been processed", 409);
            }
            updatedRequest = latestRequest;
        }
    }

    if (status === "accepted") {
        const originalMessage = await messageRepository.findMessageById(request.message);
        const revealedMessage = await messageRepository.makeMessagePublic(
            request.message,
            messageAuthorId,
        );
        if (
            !revealedMessage &&
            (!originalMessage ||
                !originalMessage.sender ||
                originalMessage.sender.toString() !== messageAuthorId ||
                originalMessage.messageType !== "public")
        ) {
            throw new AppError("The message sender could not be revealed", 409);
        }
        if (!originalMessage) {
            throw new AppError("Message not found", 404);
        }
        await conversationService.createForAcceptedReveal(
            originalMessage._id,
            originalMessage.sender,
            originalMessage.receiver,
        );
    }

    return updatedRequest;
}
