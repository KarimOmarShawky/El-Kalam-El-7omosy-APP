import {cacheProvider} from '../cache/init.js';

export const idempotencyMiddleware = (ttl = 3600) => {
    return async (req, res, next) => {
        const idempotencyKey = req.headers['idempotency-key'];
        if (!idempotencyKey) {
            return res.status(400).json({ error: 'Idempotency key is required' });
        }

        const key = `${req.method}:${req.originalUrl}:${idempotencyKey}`;

        try {
            const cachedResponse = await cacheProvider.get(key);
            if (cachedResponse) {
                return res.status(200).json(JSON.parse(cachedResponse));
            }
        } catch {
            // ignore cache failures and continue normally
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            Promise.resolve(cacheProvider.set(key, JSON.stringify(body), ttl)).catch(() => undefined);
            return originalJson(body);
        };

        return next();
    };
};