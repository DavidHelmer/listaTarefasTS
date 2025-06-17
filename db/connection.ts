import { Sequelize } from "sequelize"
import dotenv from 'dotenv'
import { env } from "process";

dotenv.config();

const db = new Sequelize ({
    database: env.DB_NAME,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    dialect: "mysql"
})

export default db;