import { Sequelize } from "sequelize-typescript"
import { env } from "process";
import dotenv from 'dotenv';
import { Task } from "../models/Task";
import { User } from "../models/User";

dotenv.config();

const db = new Sequelize({
    database: env.DB_NAME,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    username: env.DB_USERNAME,
    dialect: "mysql",
    models: [Task, User]
})

export default db;