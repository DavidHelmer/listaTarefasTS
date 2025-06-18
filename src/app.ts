import express from 'express';
import db from './db/connection';
import tarefaRoutes from './routes/tarefaRoute'

const app = express();

app.use(express.json());

app.use('/', tarefaRoutes)

app.listen(3000, () => { console.log('Servidor rodando na porta 3000') })

async function syncDatabase() {
    try {
        await db.sync({ force: false });
        console.log('Tabelas sincronizadas com sucesso');
    } catch (error) {
        console.log('Erro ao sincronizar o banco de dados: ', error);
    }
}
syncDatabase();

