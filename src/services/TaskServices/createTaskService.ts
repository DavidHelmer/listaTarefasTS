import { AppError } from "../../errors/AppError";
import { CreateData, Task } from "../../models/Task";
import { TaskSchemas } from "./schemas";

export const createTaskService = async ({ name, description, urgent }: CreateData): Promise<Task> => {
    await TaskSchemas.createTask.validate({ name, description, urgent })
    name = name.toLowerCase();

    const taskExists = await Task.findOne({
        where: { name: name }
    })

    if (taskExists) {
        throw new AppError('Task já existente');
    }

    const task = await Task.create({
        name,
        description,
        urgent
    })

    return task;
}