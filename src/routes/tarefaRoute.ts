import { Router, Request, Response } from 'express';
import { addTarefa, alterarTarefa, deletarTarefa, verTarefas } from '../controllers/tarefaController';

const router = Router();

router.post('/add', addTarefa);

router.get('/', verTarefas);

router.put('/update/:id', alterarTarefa)

router.delete('/delete/:id', deletarTarefa)


export default router;