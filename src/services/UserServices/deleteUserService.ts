import { AppError } from "../../errors/AppError"
import { Tarefa } from "../../models/Tarefa";
import { User } from "../../models/User";

export const deleteUserService = async (id): Promise<void> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('O usuário não existe')
    }

    if (Tarefa.findOne({
        where: { usuarioId: id }
    })) {
        throw new AppError('Uma ou mais tarefas estão relacionadas a esse usuário, desvincule as tarefas antes de deletar ele do sistema')
    }

    await user.destroy();
}