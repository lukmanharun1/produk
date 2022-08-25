const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");
const validate = require("../middlewares/validate");
const validation = require("../validations/users");

router.post("/register", validation.register(), validate, controller.register);
router.post("/login", validation.login(), validate, controller.login);

module.exports = router;
