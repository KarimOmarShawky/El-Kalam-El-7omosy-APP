import './common/db/mongoose.js';
import express from 'express';
import routes from './routes.js'
import {logger} from '../src/common/logger/logger.js'
import cors from 'cors';


const app = express();
app.use(cors({
    origin: '*',
}));

app.use(express.json());

app.use('/api/v1', routes);
app.use((err, req, res, next) => {
    logger.error(err, {
        method: req.method,
        path: req.originalUrl,
    });
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';

    
    res.status(statusCode).json({
        statusCode: statusCode,
        status: 'error',
        message,
        stack: err.stack,

    })
})
app.listen(3000, () => {
    logger.info('Server started', { port: 3000 });
});