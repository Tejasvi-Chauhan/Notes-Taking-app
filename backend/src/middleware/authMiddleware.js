import jwt from "jsonwebtoken";
import User from "../model/User.js";

const authMiddleware = async (req, res, next) => {
 const token =
  req.cookies?.token ||
  req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user; //  logged in user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired" });
  }
};

export default authMiddleware;
