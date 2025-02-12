import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error("Redis credentials are not set in environment variables");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "12 h"), // 5 requests per 12 hours per IP
  analytics: true,
  prefix: "@upstash/ratelimit",
  timeout: 10000,
});

// Simple utility function to convert seconds to hours, minutes and seconds
function formatSeconds(seconds: number): string {
  if (seconds <= 0) {
    return "0 seconds";
  }

  const hours = Math.floor(seconds / 3600);
  const remainder = seconds % 3600;
  const mins = Math.floor(remainder / 60);
  const secs = remainder % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (mins > 0) parts.push(`${mins} minute${mins !== 1 ? "s" : ""}`);
  if (secs > 0) parts.push(`${secs} second${secs !== 1 ? "s" : ""}`);

  // If everything but seconds was 0, and secs = 0, fallback
  if (parts.length === 0) {
    return "0 seconds";
  }

  return parts.join(", ");
}

export async function checkRateLimit(identifier: string) {
  const result = await rateLimiter.limit(identifier);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const resetSeconds = result.reset/1000 - nowSeconds; 
  const secondsUntilReset = Math.max(resetSeconds, 0);
  const formatedTime = formatSeconds(secondsUntilReset);

  if (!result.success) {
    return {
      type: "error",
      remaining: result.remaining,
      reset: formatedTime,
    };
  }

  return {
    type: "success",
    remaining: result.remaining,
    reset: formatedTime,
  };
}
