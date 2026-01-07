import express from "express";
import { sendTelegramMessage } from "../utils/sendTelegram.js";

const router = express.Router();

router.get("/telegram-test", async (req, res) => {
  await sendTelegramMessage(" Telegram bot is working perfectly!");
  res.json({ success: true });
});

export default router;
