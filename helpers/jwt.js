const jwt = require("jsonwebtoken");
require("dotenv").config();

const { LOGIN_TOKEN_SECRET } = process.env;

const createTokenLogin = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      LOGIN_TOKEN_SECRET,
      { expiresIn: "7 days" },
      (err, data) => {
        if (err)
          reject({
            message: error,
            statusCode: 422,
          });
        resolve(data);
      }
    )
  );

const createTokenLoginSync = (payload) =>
  jwt.sign(payload, LOGIN_TOKEN_SECRET, { expiresIn: "7 days" });

const verifyTokenLogin = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, LOGIN_TOKEN_SECRET, (err, decoded) => {
      if (err)
        reject({
          message: error,
          statusCode: 422,
        });
      resolve(decoded);
    })
  );

module.exports = {
  createTokenLogin,
  createTokenLoginSync,
  verifyTokenLogin,
};
