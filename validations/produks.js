const { query, body, param } = require("express-validator");

const getAll = () => [
  query("page").isInt({ gt: 0 }).toInt(),
  query("per_page").isInt({ gt: 0 }).toInt(),
];
const create = () => [
  body("kode_produk").isString().isLength({ max: 12 }),
  body("nama_produk").isString().isLength({ min: 3, max: 128 }),
  body("qty").isInt({ gt: 0 }),
];

const getById = () => [param("id").isUUID()];

const update = () => [
  param("id").isUUID(),
  body("kode_produk").optional().isString().isLength({ max: 12 }),
  body("nama_produk").optional().isString().isLength({ min: 3, max: 128 }),
  body("qty").isInt({ gt: 0 }),
];

module.exports = {
  getAll,
  create,
  getById,
  update,
};
