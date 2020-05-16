const Plan = require("../models/plan");
const User = require("../models/user");

exports.viewPlans = (req, res, next) => {
  Plan.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};

exports.onSubscribePlan = (req, res, next) => {
  const userId = req.userId;
  const planId = req.params.id;
  let selectedPlan;
  Plan.findById(planId)
    .then((plan) => {
      selectedPlan = plan;
      return User.findById(userId);
    })
    .then((user) => {
      user.membership = selectedPlan;
      user.membershipStartDate = new Date();
      var expDate = new Date();
      user.membershipEndDate = expDate.setDate(expDate.getDate() + 30);
      return user.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};

exports.onUnsubscribePlan = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      user.membership = null;
      user.membershipStartDate = null;
      user.membershipEndDate = null;
      return user.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};
