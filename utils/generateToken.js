// PACKAGES
import jwt from "jsonwebtoken";

// Generate Token based on 'ID' whereby 'ID' is the 'payload'
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
