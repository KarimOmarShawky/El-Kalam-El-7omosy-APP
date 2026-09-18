import express from 'express';
import routes from './routes.js'
import {db} from './common/db/mongoose.js'

const app = express();

app.use(express.json());

app.use('/api/v1', routes);
app.use((err, req, res, next) => {
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
    console.log("Server started on port 3000");
});