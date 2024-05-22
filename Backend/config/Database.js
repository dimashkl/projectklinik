import { Sequelize } from "sequelize";

const db = new Sequelize('admin_klinik', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;