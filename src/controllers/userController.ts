import { Request, Response } from 'express'
import { CreateData } from '../models/User'
import { createUserService } from '../services/UserServices/createUserService';
import { seeUsersService } from '../services/UserServices/seeUsersService';
import { updateUserService } from '../services/UserServices/updateUserService';
import { deleteUserService } from '../services/UserServices/deleteUserService';

//Cria um usuário novo
export const addUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, tarefaId } = req.body

    const newUser = await createUserService({ name, email, tarefaId });

    return res.json({
        "message": "Usuario criado com sucesso",
        newUser
    })
}

export const seeUsers = async (req: Request, res: Response): Promise<any> => {
    const users = await seeUsersService()
    return res.status(201).json({
        message: "Usuarios listados com sucesso",
        users
    })
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { name, email, tarefaId } = req.body as CreateData;

    const user = await updateUserService({ name, email, tarefaId }, id);
    return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user
    })
}


export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);

    await deleteUserService(id);

    return res.status(201).send("Usuário deletado com sucesso");

}