import { Router, Request, Response } from 'express';
import { addTask, alterarTask, deletarTask, verTasks } from '../controllers/taskController';

const router = Router();

router.post('/add', addTask);

router.get('/', verTasks);

router.put('/update/:id', alterarTask)

router.delete('/delete/:id', deletarTask)


export default router;