const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  console.log("In the protect");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = await req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select(-decoded.password);
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("No token found!");
  }
};

module.exports = protect;
