const multer = require("multer");
//save as pdf
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-resume.pdf`);
    },
});
const uploadToMulter = multer({ storage: storage }).single("file");


module.exports = {
  uploadToMulter,
};
