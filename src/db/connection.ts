import { Sequelize } from "sequelize-typescript"
import { env } from "process";
import dotenv from 'dotenv';
import { Tarefa } from '../models/Tarefa'

dotenv.config();

const db = new Sequelize ({
    database: env.DB_NAME,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    username: env.DB_USERNAME,
    dialect: "mysql",
    models: [Tarefa]
})

export default db;