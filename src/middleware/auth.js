const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.J_SECRET;

function authMiddleware(role) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({ message: "Invalid/not provided token" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid/not provided token" });
      }

      const { id, role } = decoded;

      const verify = await user.Verify(id, role);

      if (!verify || (role && role !== decoded.role)) {
        return res.status(400).json({ message: "Not allowed" });
      }

      req.session = decoded;

      next();
    });
  };
}

module.exports = authMiddleware;
