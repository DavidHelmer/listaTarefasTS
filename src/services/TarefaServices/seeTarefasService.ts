import { Tarefa } from "../../models/Tarefa"

export const seeTarefasService = async (): Promise<Tarefa[]> => {
    const tarefas = await Tarefa.findAll();
    return tarefas;
}