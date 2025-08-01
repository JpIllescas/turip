const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle, 
        },
        /*¨ssl:{require: true}*/
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
            }
        }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.libros =  require("./libro.model.js")(sequelize,Sequelize);
db.estudiantes = require("./estudiante.model.js")(sequelize,Sequelize);
db.prestamos = require("./prestamo.model.js")(sequelize,Sequelize);

module.exports = db;

// Relaciones

db.libros.hasMany(db.prestamos, { foreignKey: 'id_libro' });
db.prestamos.belongsTo(db.libros, { foreignKey: 'id_libro' });

db.estudiantes.hasMany(db.prestamos, { foreignKey: 'id_estudiante' });
db.prestamos.belongsTo(db.estudiantes, { foreignKey: 'id_estudiante' });

module.exports = db;
