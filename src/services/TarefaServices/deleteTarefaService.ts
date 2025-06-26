import { AppError } from "../../errors/AppError"
import { Tarefa } from "../../models/Tarefa";

export const deleteTarefaService = async (id): Promise<void> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
        throw new AppError('A tarefa não existe');
    }

    await tarefa.destroy();
}