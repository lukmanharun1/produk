const { validationResult } = require("express-validator");
const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      // hapus file terlebih dahulu
      const hapusFile = require("../helpers/hapus_file");
      await hapusFile(req.file.path);
    }
    const response = require("../helpers/response");
    return response(res, { errors }, 400);
  }
  return next();
};

module.exports = validate;
