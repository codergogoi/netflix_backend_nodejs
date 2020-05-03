module.exports = (req, res, next) => {
  if (!req.get("authorization")) {
    const authorization = req.cookies["Authorization"];
    req.headers["authorization"] = `Bearer ${authorization}`;
  }
  next();
};
