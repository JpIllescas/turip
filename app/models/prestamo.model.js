module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define("prestamo", {
        id_prestamo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_libro: {
            type: Sequelize.INTEGER,
            references:{
                model: "libros",
                key: "id_libro"
            }
        },
        id_estudiante: {
            type: Sequelize.INTEGER,
            references: {
                model: "estudiantes",
                key: "id_estudiante"
            }
        },
        fechaPrestamo: {
            type: Sequelize.DATE
        },
        fechaDevolucion: {
            type: Sequelize.DATE
        }
    });
    return Prestamo;
};