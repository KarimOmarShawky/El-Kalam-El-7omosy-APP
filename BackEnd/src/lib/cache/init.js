import {RedisConnectionProvider} from "../../pkg/cache/redis.js";
import {env} from "../config/env.js";
export const cacheProvider = new RedisConnectionProvider({
    host: env.redis.redisHost,
    port: env.redis.redisPort,
    password: env.redis.redisPassword||'',
})