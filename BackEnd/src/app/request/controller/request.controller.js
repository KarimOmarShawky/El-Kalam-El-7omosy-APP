import { validateSchema } from "../../../lib/validation/validation.js"
import { changeRequestStatusSchema, createRequestSchema } from "../dto/request.dto.js"
import * as requestService from "../service/request.service.js"
export const createRequest = async (req, res, next) => {
    try {
        const data = validateSchema(createRequestSchema, req.body);
        const request = await requestService.createRequest(data.message, req.user.id);
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
        const requests = await requestService.getRequests(req.user.id);
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
        const data = validateSchema(changeRequestStatusSchema, req.body);
        const updatedRequest = await requestService.changeRequestStatus(
            data.requestId,
            req.user.id,
            data.status,
        );
        res.status(200).json({
            message: `Request has been ${data.status} successfully`,
            success: true,
            data: updatedRequest,
        });
    } catch (error) {
        next(error);
    }
}