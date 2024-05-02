import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Redis Client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: 0
});
redisClient.connect();
redisClient.on('connect', () => {
    console.log("Redis Client conected");
})

export default redisClient;