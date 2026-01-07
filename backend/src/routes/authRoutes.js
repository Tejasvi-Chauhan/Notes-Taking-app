import { Router } from "express";
import { signup, login } from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendTelegramMessage } from "../utils/sendTelegram.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

//  ADD THIS (VERY IMPORTANT)
router.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // logged-in user
  });
});

router.post("/logout", authMiddleware, async (req, res) => {
   const user = req.user; // auth middleware se aata hai

  const time = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  await sendTelegramMessage(
    `🚪 User Logged Out
 Name: ${user.name}
 Email: ${user.email}
 Time: ${time}`
  );
res.clearCookie("token", {
  httpOnly: true,
  secure: true,        
  sameSite: "none",    
});

   
  res.status(200).json({ message: "Logged out successfully" });
});


export default router;
