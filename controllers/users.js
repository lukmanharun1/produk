const { Users } = require("../models");
const response = require("../helpers/response");
const { passwordHash, verifyPassword } = require("../helpers/password");
const { createTokenLogin } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    // buat password hash
    const [findUserByEmail, myPassword] = await Promise.all([
      Users.findOne({
        where: { email },
      }),
      passwordHash(password),
    ]);
    if (findUserByEmail) {
      throw {
        message: "Data email sudah ada!",
        statusCode: 400,
      };
    }
    const createUser = await Users.create({
      email,
      first_name,
      last_name,
      password: myPassword,
    });
    if (!createUser) {
      throw {
        message: "Data user gagal dibuat!",
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUserByEmail = await Users.findOne({
      where: { email },
    });
    if (!email) {
      throw {
        message: "Email atau password salah!",
        statusCode: 400,
      };
    }
    // verifikasi password | buat token JWT
    const [isVerifyPassword, token] = await Promise.all([
      verifyPassword(password, findUserByEmail.password),
      createTokenLogin({
        email,
        first_name: findUserByEmail.first_name,
        last_name: findUserByEmail.last_name,
      }),
    ]);
    if (!isVerifyPassword) {
      throw new Error("Email atau Password salah!");
    }
    return response(res, {
      status: "success",
      message: "Login berhasil!",
      token,
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

module.exports = {
  register,
  login,
};
