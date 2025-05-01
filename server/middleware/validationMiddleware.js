// middleware/validationMiddleware.js
const { body, param, validationResult } = require("express-validator");

// User validations
const validateSignup = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Item validations
const validateItem = [
  body("itemname").notEmpty().withMessage("Item name is required"),
  body("itemdescription")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("concerntype")
    .notEmpty()
    .withMessage("Concern type is required")
    .isIn(["lost", "found"])
    .withMessage("Concern type must be either 'lost' or 'found'"),
  body("images")
    .isArray()
    .withMessage("Images should be an array (even if empty)"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


// Claimant validations
const validateClaimant = [
  body("claimantname").notEmpty().withMessage("Name is required"),
  body("mobilenumber")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isMobilePhone()
    .withMessage("Enter a valid mobile number"),
  body("hostelname").notEmpty().withMessage("Hostel name is required"),
  body("proofofclaim").notEmpty().withMessage("Proof of claim is required"),
  body("itemdetails").notEmpty().withMessage("Item details are required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
// Helper validations
const validateHelper = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
  validateItem,
  validateClaimant,
  validateHelper,
};
