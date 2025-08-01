 const db = require("../models");
const Estudiante = db.estudiantes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const estudiante = {
        nombre: req.body.nombre,
        carnet: req.body.carnet,
        correo: req.body.correo
    };

    Estudiante.create(estudiante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Estudiante."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Estudiantes."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiante.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Estudiante with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, {
        where: { id_estudiante: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Estudiante with id=${id}. Maybe Estudiante was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Estudiante with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Estudiante.destroy({
        where: { id_estudiante: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Estudiante with id=${id}. El estudiante no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Estudiante.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Estudiantes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Estudiantes."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Estudiante.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Estudiante."
            });
        }); 
};