const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.send("Please login first!!!");
    }
  } else {
    res.send("Please login first!!!");
  }
};

module.exports = { authenticate };
