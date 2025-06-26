import { AppError } from "../../errors/AppError";
import { CreateData, Tarefa } from "../../models/Tarefa";

export const updateTarefaService = async ({ name, description, urgent }: CreateData, id): Promise<Tarefa> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
        throw new AppError('A tarefa não existe')
    }

    await tarefa.update({
        name,
        description,
        urgent
    })

    await tarefa.save();

    return tarefa;
}