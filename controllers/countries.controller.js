const db = require("../models");
const Countries = db.courtries;


exports.create = (req, res) => {
    const Countries = {
        name: req.body.name,
        code: req.body.code,

    };
    Countries.create(Countries)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Countries."
        });
    });
};

exports.bulkCreate = (req, res) => {
    const Countries = req.body.countries;
    Countries.bulkCreate(Countries)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Countries."
            });
        });
};


exports.findByCodes = (req, res) => {
    const code = req.params.code;
    Countries.findAll({
        where: {
            code: code
        }
    })
        .then(data => {
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Countries with code=" + code
            });
        });
};



exports.findAll = (req, res) => {
    Countries.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving countries."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Countries.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Countries with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Countries.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Countries was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Countries with id=${id}. Maybe Countries was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Countries with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Countries.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Countries was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Countries with id=${id}. Maybe Countries was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Countries with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Countries.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Countries were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all countries."
        });
    });
};

exports.findByNames = (req, res) => {
    Countries.findAll({ where: { name: req.params.name } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving countries."
        });
    });
}
