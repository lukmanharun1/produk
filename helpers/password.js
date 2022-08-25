const { hash, compare } = require("bcrypt");

const saltRounds = 10;
const passwordHash = (password) => hash(password, saltRounds);

const verifyPassword = (password, passwordHash) =>
  compare(password, passwordHash);

module.exports = {
  passwordHash,
  verifyPassword,
};
