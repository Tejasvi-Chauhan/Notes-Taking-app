
import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'
import dotenv from 'dotenv';
dotenv.config();

// Create a new ratelimiter, that allows 20 requests per 1 minute
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})
export const rateLimit = new  Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(70, "1 m"),
  analytics: true,
})