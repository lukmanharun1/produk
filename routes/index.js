const fs = require("fs/promises");

const express = require("express");
const router = express.Router();

async function readRoutes() {
  const files = await fs.readdir("./routes");
  for (const file of files) {
    const [uri] = file.split(".");
    if (uri !== "index") {
      router.use(`/${uri}`, require(`./${file}`));
    }
  }
}
readRoutes();

module.exports = router;
