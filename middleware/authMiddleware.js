// PACKAGES
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// MODEL
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the JWT for Verification
      token = req.headers.authorization.split(" ")[1];
      // 'decoded' contains the 'USER ID' based on 'authUser' controller,  'iat' and 'expiration date'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get the 'user' based on the 'decoded' ID and de-select 'password' property
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized. Token failed..");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized..");
  }
});

// Check if user is ADMIN or not. Meant for use on specific routes.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized access. Meant for Admin(s) only..");
  }
};

export { protect, admin };
