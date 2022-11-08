const db = require("../models");
const { upload } = require("../utils/extensions");

exports.upload = async (file) => {
  const Files = {
    name: file.originalname,
    url: file.path,
    created_at: new Date(),
    updated_at: new Date(),
  };
  await db.files.create(Files);
};

exports.findAll = (req, res) => {};

exports.delete = (req, res) => {
  const id = req.params.id;
  Files.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Files was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Files with id=${id}. Maybe Files was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Files with id=" + id,
      });
    });
};
