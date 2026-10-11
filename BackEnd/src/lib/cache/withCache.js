import {cacheProvider} from './init.js';

export const withCache = (ttl = 3600) => async (req, res, next) => {
    const key = `${req.method}:${req.originalUrl}`;
    const cached = await cacheProvider.get(key);

    if (cached) {
        return res.json(JSON.parse(cached));
    }

    const originalJson = res.json.bind(res);
    res.json = async (body) => {
        await cacheProvider.set(key, JSON.stringify(body), ttl);
        return originalJson(body);
    };

    return next();
};
