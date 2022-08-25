const { Produks, Sequelize } = require("../models");
const response = require("../helpers/response");
const hapusFile = require("../helpers/hapus_file");
const paginate = require("../helpers/paginate");

const { HOST, PORT } = process.env;
const getAll = async (req, res) => {
  try {
    const { page, per_page } = req.query;
    const pathUpload = `${HOST}:${PORT}/produks/`;
    const { count, rows } = await Produks.findAndCountAll({
      offset: (page - 1) * page,
      limit: per_page,
      distinct: true,
      attributes: [
        "id",
        "kode_produk",
        "nama_produk",
        [
          Sequelize.fn("CONCAT", pathUpload, Sequelize.col("image_produk")),
          "src_image_produk",
        ],
      ],
    });
    if (rows.length === 0) {
      throw {
        message: "Data produk tidak ada!",
        statusCode: 404,
      };
    }
    const data = paginate({ data: rows, count, page, per_page });
    return response(res, {
      status: "success",
      data,
    });
  } catch (error) {
    return response(
      res,
      {
        status: "error",
        message: error.message,
      },
      error.statusCode || 500
    );
  }
};

const create = async (req, res) => {
  try {
    const { kode_produk, nama_produk, qty } = req.body;
    if (!req.file) {
      return response(
        res,
        {
          message: "image_produk harus diisi!",
          statusCode: 400,
        },
        400
      );
    }
    const { filename } = req.file;
    // create produk
    const [_, isCreateProduk] = await Produks.findOrCreate({
      where: { nama_produk },
      defaults: { kode_produk, nama_produk, qty, image_produk: filename },
    });
    // nama produk harus unik
    if (!isCreateProduk) {
      throw {
        message: "Data produk sudah ada!",
        statusCode: 400,
      };
    }
    return response(
      res,
      {
        status: "success",
        message: "Data produk berhasil ditambahakan!",
      },
      201
    );
  } catch (error) {
    if (req.file) await hapusFile(req.file.path);
    return response(
      res,
      {
        status: "error",
        message: error.message,
      },
      error.statusCode || 500
    );
  }
};

module.exports = {
  getAll,
  create,
};
