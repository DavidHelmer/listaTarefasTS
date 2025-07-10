import { AppError } from "../../errors/AppError"
import { Task } from "../../models/Task";

export const deleteTaskService = async (id): Promise<void> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const task = await Task.findByPk(id);

    if (!task) {
        throw new AppError('A task não existe');
    }

    await task.destroy();
}