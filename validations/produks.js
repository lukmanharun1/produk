const { query, body } = require("express-validator");

const getAll = () => [
  query("page").isInt({ gt: 0 }).toInt(),
  query("per_page").isInt({ gt: 0 }).toInt(),
];
const create = () => [
  body("kode_produk").isString().isLength({ max: 12 }),
  body("nama_produk").isString().isLength({ min: 3, max: 128 }),
  body("qty").isInt({ gt: 0 }),
];

module.exports = {
  getAll,
  create,
};
