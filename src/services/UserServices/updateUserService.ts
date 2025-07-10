import { AppError } from "../../errors/AppError"
import { Task } from "../../models/Task";
import { CreateData, User } from "../../models/User"

export const updateUserService = async ({ name, email, taskId }: CreateData, id): Promise<User> => {
    if (isNaN(id)) {
        throw new AppError('ID inválido')
    }

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('O usuário nao existe')
    }

    await user.update({
        name,
        email,
    })

    if (taskId && taskId.length > 0) {
        await Task.update(
            { usuarioId: id },
            { where: { id: taskId } }
        )
    }

    await user.save();
    return user;
}