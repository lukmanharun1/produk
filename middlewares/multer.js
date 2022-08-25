const multer = require("multer");
const path = require("path");

const destination = "public/produks/";
const storage = multer.diskStorage({
  destination,
  filename: async (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 10_000_000 }, //limit 10mb
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image_produk");

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb("file image produk harus jpg|jpeg|png");
}
module.exports = uploadImage;
