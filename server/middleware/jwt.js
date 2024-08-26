const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // Check if token is present
  if (!req.headers.authorization) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzg2OWRhMTczMDk1ZWY3ZjE2YjdiYSIsImVtYWlsIjoiYW5vdGhlckBlbWFpbC5jb20iLCJpYXQiOjE3MjQ0MTA3NjMsImV4cCI6MTcyNDQzMjM2M30.mYmboJzr-cXOlkigLj9QHVKcGVGWgInMfTu6sxI80rU"
  // the above is the token and below says that it will return an array that provides a space between "Bearer" and the token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

module.exports = isAuthenticated;
