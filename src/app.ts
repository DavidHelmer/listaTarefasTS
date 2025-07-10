import express, { NextFunction, Request, Response } from 'express';
import db from './db/connection';
import taskRoutes from './routes/taskRoute';
import userRoutes from './routes/userRoute'
import { AppError } from './errors/AppError';
import { ValidationError } from 'yup';

const app = express();

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {

    if (err instanceof ValidationError) {
        return res.status(400).json({
            status: 'validation error',
            errors: err.errors
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.log(err);

    // return res.status(500).json({
    //     status: 'error',
    //     message: 'Internal server error'
    // });
})

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

