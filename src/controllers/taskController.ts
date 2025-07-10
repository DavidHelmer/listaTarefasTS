import { Request, Response } from 'express'
import { CreateData } from '../models/Task'
import { createTaskService } from '../services/TaskServices/createTaskService'
import { updateTaskService } from '../services/TaskServices/updateTaskService'
import { seeTasksService } from '../services/TaskServices/seeTasksService'
import { deleteTaskService } from '../services/TaskServices/deleteTaskService'

//Adicionar uma task nova
export const addTask = async (req: Request, res: Response): Promise<any> => {
    const { name, description, urgent } = req.body as CreateData
    const task = await createTaskService({ name, description, urgent })

    return res.status(200).json({
        message: "Task criada com sucesso",
        task
    })

}

//Ver todas as tasks
export const verTasks = async (req: Request, res: Response): Promise<any> => {
    const tasks = await seeTasksService();
    return res.status(201).json({
        message: "Tasks listadas com sucesso",
        tasks
    })
}

export const alterarTask = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { name, description, urgent } = req.body as CreateData;

    const task = await updateTaskService({ name, description, urgent }, id)

    return res.status(200).json({
        message: "Task atualizada com sucesso",
        task
    })
}

//Deleta uma task
export const deletarTask = async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);

    await deleteTaskService(id);

    return res.status(200).send("Task deletada com sucesso");

}