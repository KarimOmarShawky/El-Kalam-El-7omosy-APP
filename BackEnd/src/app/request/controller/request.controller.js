import { validateSchema } from "../../../lib/validation/validation.js"
import { createRequestSchema } from "../validation/request.validation.js"
import * as requestService from "../service/request.service.js"
export const createRequest = async (req, res, next) => {
    try {
        const { message, receiver } = req.body;
        // validate request body
        const data = validateSchema(createRequestSchema, { message, receiver });
        const request = await requestService.createRequest(data.message, data.receiver);
        res.status(201).json({
            message: "Request created successfully",
            success: true,
            data: request,
        });
    } catch (error) {
        next(error);
    }
}

export const getRequests = async (req, res, next) => {
    try {
        const messageSender = req.user.id;
        const requests = await requestService.getRequests(messageSender);
        res.status(200).json({
            message: "Requests retrieved successfully",
            success: true,
            data: requests,
        });
    } catch (error) {
        next(error);
    }
}

export const changeRequestStatus = async (req, res, next) => {
    try {
        const { message, receiver, status } = req.body;
        const updatedRequest = await requestService.changeRequestStatus(message, receiver, status);
        res.status(200).json({
            message: `Request has been ${status} successfully`,
            success: true,
            data: updatedRequest,
        });
    } catch (error) {
        next(error);
    }}