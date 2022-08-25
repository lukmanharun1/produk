const { body } = require("express-validator");

const register = () => [
  body("email").isEmail(),
  body("first_name").isString().isLength({ min: 1, max: 128 }),
  body("last_name").isString().isLength({ min: 1, max: 128 }),
  body("password").isStrongPassword(),
];

const login = () => [
  body("email").isEmail(),
  body("password").isStrongPassword(),
];

module.exports = {
  register,
  login,
};
