const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token:", token); // Add this line to debug

  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded); // Add this line to debug
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error); // Add this line to debug
    res.status(403).json({ message: 'Invalid token, access denied' });
  }
};

module.exports = authMiddleware;
