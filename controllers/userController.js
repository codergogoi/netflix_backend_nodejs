const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { APP_KEY } = require('../configs/appConst');

const User = require('../models/user');
const Movie = require('../models/movie');

/**
 * Public Access
 */
exports.onSignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Validation Erro');
    // err.statusCode = 422;
    err.message = 'Email Id already Exist. Please login using your password!';
    err.data = errors.array();
    next(err);
    return;
  }

  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
        contactNumber: null,
        membership: null,
        membershipStartDate: null,
        membershipEndDate: null,
        wishlist: [],
        profiles: [
          {
            title: firstName,
            category: 'Adult',
            choice: null,
          },
        ],
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({ msg: 'Signup Successfully!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onForgotPassword = (req, res, next) => {};

exports.onLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Validation Erro');
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }

  let email = req.body.email;
  let password = req.body.password;
  let loginUser = null;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error('User Does not exist with the provided email ID');
        err.statusCode = 401;
        throw err;
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        const err = new Error('Passwod does not match!');
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { userId: loginUser._id.toString(), email: loginUser.email },
        APP_KEY,
        { expiresIn: '90d' }
      );

      res.status(200).json(token);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onMockLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Validation Erro');
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }

  let email = req.body.email;
  let password = req.body.password;
  let loginUser = null;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error('User Does not exist with the provided email ID');
        err.statusCode = 401;
        throw err;
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        const err = new Error('Passwod does not match!');
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { userId: loginUser._id.toString(), email: loginUser.email },
        APP_KEY,
        { expiresIn: '90d' }
      );

      res
        .status(200)
        .json({
          firstName: loginUser.firstName,
          lastName: loginUser.lastName,
          subscription: loginUser.membership,
          profiles: loginUser.profiles,
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/**
 * Private Access
 */

exports.onViewProfile = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((result) => {
      const profiles = result.profiles;
      res.status(200).json(profiles);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onAddProfile = (req, res, next) => {
  const userId = req.userId;
  const title = req.body.title;
  const isKids = Boolean(req.body.kid);

  User.findById(userId)
    .then((result) => {
      result.profiles.push({
        title: title,
        category: isKids ? 'Kid' : 'Adult',
        choice: null,
      });
      return result.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onAddChoice = (req, res, next) => {
  const userId = req.userId;
  const choiceId = req.params.id;
  const choices = req.body.choice;

  User.findById(userId)
    .then((result) => {
      result.profiles.forEach((profile) => {
        if (profile._id.toString() === choiceId) {
          profile.choice = choices;
        }
      });

      return result.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onDeleteProfile = (req, res, next) => {
  const userId = req.userId;
  const profileId = req.params.id;

  User.findById(userId)
    .then((result) => {
      let skippedProfiles = result.profiles.filter((profile) => {
        return profile._id.toString() !== profileId;
      });

      result.profiles = skippedProfiles;
      return result.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewWatchlist = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .populate('wishlist')
    .then((movies) => {
      res.json(movies.wishlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addToWatchlist = (req, res, next) => {
  const userId = req.userId;
  const movieId = req.params.id;
  let currentUser;
  User.findById(userId)
    .populate('wishlist')
    .then((user) => {
      currentUser = user;
      return Movie.findById(movieId);
    })
    .then((movie) => {
      let isExist = false;
      currentUser.wishlist.map((item) => {
        if (item._id.toString() === movieId.toString()) {
          isExist = true;
        }
      });
      if (!isExist) {
        currentUser.wishlist.push(movie);
      }
      return currentUser.save();
    })
    .then((result) => {
      res.status(200).json(result.wishlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.removeWatchlist = (req, res, next) => {
  const userId = req.userId;
  const movieId = req.params.id;
  User.findById(userId)
    .populate('wishlist')
    .then((user) => {
      user.wishlist.remove(movieId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json(result.wishlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
