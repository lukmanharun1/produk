const express = require("express");
const router = express.Router();

const controller = require("../controllers/produks");
const validate = require("../middlewares/validate");
const validation = require("../validations/produks");
const authentication = require("../middlewares/authentication");
const uploadImage = require("../middlewares/multer");

router.get(
  "/",
  authentication,
  validation.getAll(),
  validate,
  controller.getAll
);

router.get(
  "/:id",
  authentication,
  validation.getById(),
  validate,
  controller.getById
);
router.post(
  "/",
  authentication,
  uploadImage,
  validation.create(),
  validate,
  controller.create
);

router.put(
  "/:id",
  authentication,
  uploadImage,
  validation.update(),
  validate,
  controller.update
);

module.exports = router;
