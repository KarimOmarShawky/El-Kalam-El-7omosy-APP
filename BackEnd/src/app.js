import './lib/db/mongoose.js';
import express from 'express';
import routes from './routes.js'
import cors from 'cors';
import {globalErrorHandler} from "./lib/error/error.handler.js";
import {generateCorrelationId} from "./lib/correlation/correlationID.js"

import cookieParser from 'cookie-parser'
export function createAPP(){

    const app = express();
    app.use(cors({
        origin: '*',
    }));

    app.use(express.json());
    app.use(cookieParser())
    app.use(generateCorrelationId)
    app.use('/api/v1', routes);
    app.use(globalErrorHandler)
    return app;
}