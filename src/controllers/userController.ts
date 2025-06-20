import { Request, Response } from 'express'
import { User, CreateData } from '../models/User'
import { Tarefa } from '../models/Tarefa';

//Cria um usuário novo
export const addUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, tarefaId } = req.body as CreateData;

        //Valida os dados
        if (!name) {
            return res.status(400).send("Você não adicionou o nome do usuário")
        }

        if (!email) {
            return res.status(400).send("Você não adicionou o email do usuário")
        }
        //Verifica se o usuário já existe
        const userExists = await User.findOne({
            where: { email: email }
        })

        if (userExists) {
            return res.status(400).send("Usuário já existente")
        }

        //Cria o usuário no banco de dados
        const user = await User.create({
            name,
            email,
        })

        if (tarefaId || tarefaId.length > 0) {
            await Tarefa.update(
                { usuarioId: user.id },
                { where: { id: tarefaId } }
            )
        }
        return res.status(400).json({
            message: "Usuario criado com sucesso",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const seeUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.findAll();
        return res.status(201).json({
            message: "Usuarios listados com sucesso",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const { name, email, tarefaId } = req.body as CreateData;

        if (isNaN(id)) {
            return res.status(400).send("ID inválido");
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).send("O usuário não existe");
        }

        await user.update({
            name,
            email,
        })

        if (tarefaId || tarefaId.length > 0) {
            await Tarefa.update(
                { usuarioId: id },
                { where: { id: tarefaId } }
            )
        }

        await user.save();
        return res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).send("ID inválido");
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).send("O usuário não existe");
        }

        await user.destroy();

        return res.status(201).send("Usuário deletado com sucesso");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}