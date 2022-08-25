const { body } = require("express-validator");

const create = () => [
  body("kode_produk").isString().isLength({ max: 12 }),
  body("nama_produk").isString().isLength({ min: 3, max: 128 }),
  body("qty").isInt({ gt: 0 }),
];

module.exports = {
  create,
};
