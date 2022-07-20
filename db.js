
const Sequelize = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: process.env.DIALECT,
    dialectModule: pg,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;