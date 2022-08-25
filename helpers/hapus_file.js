const fs = require("fs");
module.exports = (destination) =>
  new Promise((resolve, reject) => {
    fs.unlink(destination, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
