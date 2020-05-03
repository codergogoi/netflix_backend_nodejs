const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const token = jwt.sign({ userId: "audience", platform: "web" }, "movie", {
    expiresIn: "23h",
  });

  res.locals.auth = token;
  res.status(200).json(token);
};
