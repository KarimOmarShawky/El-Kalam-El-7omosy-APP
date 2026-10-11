import {logger} from "../../pkg/logger/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
    logger.error(err, {
        method: req.method,
        path: req.originalUrl,
        stack: err.stack,
        correlationId: req.correlationId
    });
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';


    res.status(statusCode).json({
        statusCode: statusCode,
        status: 'error',
        message,
        stack: err.stack,

    })

}