import { AppError } from "../../errors/AppError";
import { CreateData, Tarefa } from "../../models/Tarefa";
import { TarefaSchemas } from "./schemas";

export const createTarefaService = async ({ name, description, urgent }: CreateData): Promise<Tarefa> => {
    await TarefaSchemas.createTarefa.validate({ name, description, urgent })
    name = name.toLowerCase();

    const tarefaExists = await Tarefa.findOne({
        where: { name: name }
    })

    if (tarefaExists) {
        throw new AppError('Tarefa já existente');
    }

    const tarefa = await Tarefa.create({
        name,
        description,
        urgent
    })

    return tarefa;
}