import http from 'http';
import {createAPP} from "./app.js";
import mongoose, {mongo} from "mongoose";
import {env} from "./lib/config/env.js";
import {logger} from "./pkg/logger/logger.js";

const app = createAPP();
const server = http.createServer(app)
server.listen(env.port, () => {
    logger.info('Server started', { port: env.port });
});

async function shutdown() {
    server.close(
        async () => {
            await mongoose.disconnect();
            process.exit(0);
        }
    );
}

server.on('SIGINT', shutdown);
server.on('SIGTERM', shutdown);