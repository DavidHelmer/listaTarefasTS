import { AppError } from "../../errors/AppError";
import { CreateData, Task } from "../../models/Task";

export const updateTaskService = async ({ name, description, urgent }: CreateData, id): Promise<Task> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const task = await Task.findByPk(id);

    if (!task) {
        throw new AppError('A task não existe')
    }

    await task.update({
        name,
        description,
        urgent
    })

    await task.save();

    return task;
}