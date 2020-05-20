module.exports = (req, res, next) => {
  const authorization = req.params.auth;
  // const authorization = req.cookies["signature"];
  if (authorization !== undefined) {
    req.headers["authorization"] = `Bearer ${authorization}`;
  }
  next();
};
