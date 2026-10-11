import Redis from "ioredis";
import {hashPassword} from "../../lib/utils/hashing.js";

export class RedisConnectionProvider{
    client;
    constructor(config) {
        this.client = new Redis(
            {
                host: config.host,
                port: config.port,
                password: config.password,
                lazyConnect: true,
                maxLoadingRetryTime : 3,

            }
        );
        this.client.on('error', (err) => {
            console.log("redis client error:", err.message);
        });
        this.client.connect().catch(err => {
            console.log("redis connection to server error:", err.message);
        })
    }
    async set(key, value,ttl) {
       return this.client.set(key, value , 'EX', ttl);
    }
    async get(key){
        return this.client.get(key);
    }
    async del(key){
        return this.client.del(key);
    }
}