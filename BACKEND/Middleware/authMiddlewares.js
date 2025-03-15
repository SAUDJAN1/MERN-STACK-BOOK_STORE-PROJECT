import jwt from "jsonwebtoken";
import userModel from "../Models/user.js";
const RequiredSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(400)
        .json({ success: false, msg: "Authorization Header Missing" });
    }
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error in JWT Middleware",
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ success: false, msg: "User Not Found" });
    }
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Access Sorry You are User " });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error in Admin Middleware",
      error: error.message,
    });
  }
};
export { RequiredSignIn, isAdmin };
