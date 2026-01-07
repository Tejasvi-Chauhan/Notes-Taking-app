import { rateLimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  // ✅ VERY IMPORTANT: CORS preflight ko bypass karo
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const { success } = await rateLimit.limit("limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    next();
  } catch (err) {
    console.error("Rate limiting error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter;
