import { AppError } from "../../errors/AppError"
import { Task } from "../../models/Task";
import { User } from "../../models/User";

export const deleteUserService = async (id): Promise<void> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido');
    }

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('O usuário não existe')
    }

    if (Task.findOne({
        where: { usuarioId: id }
    })) {
        throw new AppError('Uma ou mais tasks estão relacionadas a esse usuário, desvincule as tasks antes de deletar ele do sistema')
    }

    await user.destroy();
}