module.exports = (req, res, next) => {
  const authorization = req.params.auth;
  if (authorization !== undefined) {
    req.headers['Authorization'] = `Bearer ${authorization}`;
  }
  console.log(authorization);
  next();
};
