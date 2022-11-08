var express = require("express");
const { upload } = require("../controllers/files.controller");
const { create } = require("../controllers/user.controller");
const db = require("../models");
const { uploadToMulter } = require("../utils/extensions");

var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { locals:{title: "Express"} });
});
router.get("/admin", function (req, res, next) {
  db.users.findAll().then((data) => {
    const users = JSON.parse(JSON.stringify(data));
    res.render("admin", { locals: { users,title:"Admin" } });
  });
  
});
router.post("/addEntry", async function (req, res, next) {
  uploadToMulter(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    await upload(req.file);
    req.body.resume = req.file.path;
    create(req, res);
  });
});
router.use("/admin/users", require("./users"));
router.use("/admin/countries", require("./countries"));
module.exports = router;
