import { Request, Response } from 'express'
import { CreateData } from '../models/Tarefa'
import { createTarefaService } from '../services/TarefaServices/createTarefaService'
import { updateTarefaService } from '../services/TarefaServices/updateTarefaService'
import { seeTarefasService } from '../services/TarefaServices/seeTarefasService'
import { deleteTarefaService } from '../services/TarefaServices/deleteTarefaService'

//Adicionar uma tarefa nova
export const addTarefa = async (req: Request, res: Response): Promise<any> => {
    const { name, description, urgent } = req.body as CreateData
    const tarefa = await createTarefaService({ name, description, urgent })

    return res.status(200).json({
        message: "Tarefa criada com sucesso",
        tarefa
    })

}

//Ver todas as tarefas
export const verTarefas = async (req: Request, res: Response): Promise<any> => {
    const tarefas = await seeTarefasService();
    return res.status(201).json({
        message: "Tarefas listadas com sucesso",
        tarefas
    })
}

export const alterarTarefa = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { name, description, urgent } = req.body as CreateData;

    const tarefa = await updateTarefaService({ name, description, urgent }, id)

    return res.status(200).json({
        message: "Tarefa atualizada com sucesso",
        tarefa
    })
}

//Deleta uma tarefa
export const deletarTarefa = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);

    await deleteTarefaService(id);

    return res.status(200).send("Tarefa deletada com sucesso");

}