import { Sequelize } from "sequelize";

const db = new Sequelize("posyandu2", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
