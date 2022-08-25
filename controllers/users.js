const { Users } = require("../models");
const response = require("../helpers/response");

const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    const [_, isCreateUser] = await Users.findOrCreate({
      where: { email },
      defaults: { email, first_name, last_name, password },
    });
    if (!isCreateUser) {
      throw {
        message: "Data email sudah ada!",
        statusCode: 400,
      };
    }
    return response(
      res,
      {
        status: "success",
        message: "Data user berhasil diregistrasi!",
      },
      201
    );
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

module.exports = {
  register,
};
