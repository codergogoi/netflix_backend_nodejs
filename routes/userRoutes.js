const router = require('express').Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const membershipController = require('../controllers/membershipController');
const auth = require('../middleware/authCheck');

/**
 * Middleware
 */
const User = require('../models/user');

/**
 * User Access
 */
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter a valid email ID')
      .custom((value, req) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already Exist');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Your password whould have to atlest 6 Character long'),
  ],
  userController.onSignup
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter a valid email ID')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Please Enter a Valid Password!'),
  ],
  userController.onLogin
);

router.post(
  '/mock-login',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter a valid email ID')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Please Enter a Valid Password!'),
  ],
  userController.onMockLogin
);

router.post('/forgot', userController.onForgotPassword);

//View Profiles
router.get('/profile', auth, userController.onViewProfile);

// Create Profiles
router.post('/profile', auth, userController.onAddProfile);

// Edit Profile
router.put('/profile/:id', auth, userController.onAddChoice);

// DSelete Profile
router.delete('/profile/:id', auth, userController.onDeleteProfile);

/**
 * Public Contents
 */

router.get('/plans', membershipController.viewPlans);

router.put('/subscribe/:id', auth, membershipController.onSubscribePlan);

router.put('/unsubscribe', auth, membershipController.onUnsubscribePlan);

/**
 * Private Contents
 */
router.get('/watch-list', auth, userController.viewWatchlist);

router.put('/watch-list/:id', auth, userController.addToWatchlist);

router.delete('/watch-list/:id', auth, userController.removeWatchlist);

/**
 * Handle Error
 */
router.use('/', (req, res, next) => {
  const newErr = Error('Please Login to access User Resources');
  newErr.statusCode = 403;
  next(newErr);
});

module.exports = router;
