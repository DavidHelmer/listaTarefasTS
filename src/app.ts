import express from 'express';
import db from './db/connection';
import tarefaRoutes from './routes/tarefaRoute'
import userRoutes from './routes/userRoute'

const app = express();

app.use(express.json());

app.use('/tarefas', tarefaRoutes);
app.use('/users', userRoutes);

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

