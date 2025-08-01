 const db = require("../models");
const Libro = db.libros;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const libro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        anioPublicacion: req.body.anioPublicacion,
        genero: req.body.genero,
        disponible: req.body.disponible
    };

    Libro.create(libro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Libro."
            });
        });
};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

    Libro.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Libros."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Libro.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Libro with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Libro.update(req.body, {
        where: { id_libro: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Libro was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Libro with id=${id}. Maybe Libro was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Libro with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Libro.destroy({
        where: { id_libro: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Libro was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Libro with id=${id}. El libro no fue encontado!`
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
    Libro.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Libros were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Libros."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Libro.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Libro."
            });
        }); 
};