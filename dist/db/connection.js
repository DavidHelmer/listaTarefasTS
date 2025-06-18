"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const process_1 = require("process");
const Tarefa_1 = require("../models/Tarefa");
const db = new sequelize_typescript_1.Sequelize({
    database: process_1.env.DB_NAME,
    host: process_1.env.DB_HOST,
    password: process_1.env.DB_PASSWORD,
    username: process_1.env.DB_USERNAME,
    dialect: "mysql",
    models: [Tarefa_1.Tarefa]
});
exports.default = db;
