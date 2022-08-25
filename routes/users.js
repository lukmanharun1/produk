const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");
const validate = require("../middlewares/validate");
const validation = require("../validations/users");

router.post("/register", validation.register(), validate, controller.register);

module.exports = router;
