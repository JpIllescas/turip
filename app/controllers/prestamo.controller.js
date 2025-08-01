 const db = require("../models");
const Prestamo = db.prestamos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.id_libro) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const prestamo = {
        id_libro: req.body.id_libro,
        id_estudiante: req.body.id_estudiante,
        fechaPrestamo: req.body.anioPublicacion,
        fechaDevolucion: req.body.fechaDevolucion
    };

    Prestamo.create(prestamo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prestamo."
            });
        });
};

exports.findAll = (req, res) => {
    const id_estudiante = req.query.id_estudiante;
    var condition = id_estudiante ? { id_estudiante: { [Op.iLike]: `%${id_estudiante}%` } } : null;

    Prestamo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prestamos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prestamo with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Prestamo.update(req.body, {
        where: { id_prestamo: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prestamo with id=${id}. Maybe Prestamo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prestamo with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Prestamo.destroy({
        where: { id_prestamo: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prestamo with id=${id}. El prestamo no fue encontado!`
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
    Prestamo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Prestamos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Prestamos."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Prestamo.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prestamo."
            });
        }); 
};