var express = require("express");
const db = require("../models");
var router = express.Router();

router.get("/", function (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  const sort = req.query.sort || "id";
  const order = req.query.order || "ASC";
  const search = req.query.search || false;
  const searchBy = req.query.searchBy || "name";
  const searchValue = req.query.searchValue || "";
  const where = {};
  if (search) {
    where[searchBy] = { [db.Sequelize.Op.like]: `%${searchValue}%` };
  }

  db.users
    .findAndCountAll({
      where,
      order: [[sort, order]],
      limit,
      offset,
    })
    .then((data) => {
      const users = JSON.parse(JSON.stringify(data));
      const pages = Math.ceil(users.count / limit);
      const pagination = {
        page: page,
        pages: pages,
        limit: limit,
        count: users.count,
      };
      res.send({ users: users.rows, pagination });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
});
router.delete("/:id", function (req, res, next) {
  db.users.destroy({ where: { id: req.params.id } }).then((data) => {
    res.send({ message: "User deleted successfully!" });
  });
});
module.exports = router;
