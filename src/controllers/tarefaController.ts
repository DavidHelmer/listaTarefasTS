import { Request, Response } from 'express'
import { Tarefa, CreateData } from '../models/Tarefa'
import bodyParser from 'body-parser';

export const addTarefa = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, urgent } = req.body as CreateData;

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
            urgent
        })

        return res.status(200).json(tarefa)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const verTarefas = async (res: Response): Promise<any> => {
    try {

        const tarefas = await Tarefa.findAll();

        return res.status(201).json({
            message: "Tarefas listadas com sucesso",
            tarefas
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão");
    }
}

export const alterarTarefa = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, urgent } = req.body as CreateData;

        const tarefa = await Tarefa.findOne({
            where: { name: req.body.name }
        })

        if (!tarefa) {
            return res.status(401).send("A tarefa não existe")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Falha na conexão")
    }
}