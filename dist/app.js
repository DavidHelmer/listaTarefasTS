"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./db/connection"));
async function syncDatabase() {
    try {
        await connection_1.default.sync({ force: false });
        console.log('Tabelas sincronizadas com sucesso');
    }
    catch (error) {
        console.log('Erro ao sincronizar o banco de dados: ', error);
    }
}
syncDatabase();
