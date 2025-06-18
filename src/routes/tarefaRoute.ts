import { Router, Request, Response } from 'express';
import { Tarefa, CreateData } from '../models/Tarefa'// ou de onde estiver exportado
import { addTarefa, verTarefas } from '../controllers/tarefaController';

const router = Router();

router.post('/add', addTarefa);

router.get('/tarefas', verTarefas);

export default router;