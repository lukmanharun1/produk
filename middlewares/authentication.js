const response = require("../helpers/response");
const { verifyTokenLogin } = require("../helpers/jwt");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw {
        message: "token tidak ditemukan!",
        statusCode: 404,
      };
    }
    const decodeToken = await verifyTokenLogin(token);
    req.decodeToken = decodeToken;
    return next();
  } catch (error) {
    return response(
      res,
      {
        status: "error",
        message: error.message,
      },
      error.statusCode || 400
    );
  }
};
