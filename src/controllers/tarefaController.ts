import { Request, Response } from 'express'
import { Tarefa, CreateData } from '../models/Tarefa'

//Adicionar uma tarefa nova
export const addTarefa = async (req: Request, res: Response): Promise<any> => {
    try {
        let { name, description, urgent } = req.body as CreateData;
        name = name.toLowerCase();
        //Valida a entrada dos dados
        if (!name) {
            return res.status(400).send("Erro ao adicionar tarefa, nome faltando");
        }

        if (!description) {
            return res.status(400).send("Erro ao adicionar tarefa, descrição faltando")
        }

        //Verifica se a tarefa já existe
        const tarefaExistente = await Tarefa.findOne({
            where: { name: name }
        })

        if (tarefaExistente) {
            return res.status(400).send("Tarefa já existente");
        }

        //Cria os dados no banco de dados
        const tarefa = await Tarefa.create({
            name,
            description,
            urgent,
        })

        return res.status(200).json(tarefa)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

//Ver todas as tarefas
export const verTarefas = async (req: Request, res: Response): Promise<any> => {
    try {

        const tarefas = await Tarefa.findAll();

        return res.status(201).json({
            message: "Tarefas listadas com sucesso",
            tarefas
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const alterarTarefa = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const { name, description, urgent, usuarioId } = req.body as CreateData;

        if (isNaN(id)) {
            return res.status(400).send("ID inválido")
        }

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(401).send("A tarefa não existe")
        }

        await tarefa.update({
            name: name,
            description: description,
            urgent: urgent,
            usuarioId: usuarioId
        })

        await tarefa.save();
        return res.status(200).json({
            message: "Tarefa atualizada com sucesso",
            tarefa
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão")
    }
}

//Deleta uma tarefa
export const deletarTarefa = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).send("ID inválido")
        }
        //Verifica se a tarefa existe
        const tarefa = await Tarefa.findOne({
            where: { id: id }
        })

        if (!tarefa) {
            return res.status(404).send("Tarefa não encontrada");
        }

        //Deleta a tarefa
        await tarefa.destroy();

        return res.status(200).send("Tarefa deletada com sucesso");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na Conexão")
    }
}