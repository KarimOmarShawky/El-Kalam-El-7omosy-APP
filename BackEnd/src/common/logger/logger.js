class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }

    log(level, message, metaData = {}) {
        const messageObj = {
            level: level,
            message: message instanceof Error ? message.message : message,
            timestamp: Date.now().toString(),
            ...(message instanceof Error && {
                name: message.name,
                stack: message.stack,
            }),
            ...metaData
        };
        console.log(JSON.stringify(messageObj) + '\n');
    }

    error(message, metaData = {}) {
        this.log('error', message, metaData);
    }

    debug(message, metaData = {}) {
        this.log('debug', message, metaData);
    }

    info(message, metaData = {}) {
        this.log('info', message, metaData);
    }
}
export const logger = new Logger();