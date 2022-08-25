const { validationResult } = require("express-validator");
const response = require("../helpers/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, { errors }, 400);
  }
  return next();
};

module.exports = validate;
