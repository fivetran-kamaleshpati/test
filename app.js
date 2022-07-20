const express = require("express");
const cors = require("cors");
// const Sequelize = require("sequelize");
// const pg = require("pg");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     port: process.env.POSTGRES_PORT,
//     dialect: process.env.DIALECT,
//     dialectModule: pg,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 1000
//     }
// });

const db = require("./db");
const Role = db.role;

app.get("/", (req, res) => {
    res.json({ message: "hello" });
});

require('./auth.routes')(app);
require('./user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    db.sequelize.sync({ alter: true}).then(() => {
        console.info("db conn esablished");
        Role.create({
            id: 1,
            name: "user"
          });
         
          Role.create({
            id: 2,
            name: "moderator"
          });
         
          Role.create({
            id: 3,
            name: "admin"
          });
    });
    console.log(`Server is running on port ${PORT}.`);
});
  