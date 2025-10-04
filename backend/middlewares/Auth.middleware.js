const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const protect = async (req,res,next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token,process.env.TOKEN_KEY)

      req.user = await User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else{
    res.status(401).json({ message: "No token, authorization denied" });
  }
}

module.exports = {protect}