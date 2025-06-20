import { Router } from 'express'
import { addUser, deleteUser, seeUsers, updateUser } from '../controllers/userController';

const router = Router();

router.get('/', seeUsers);

router.post('/add', addUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

export default router;