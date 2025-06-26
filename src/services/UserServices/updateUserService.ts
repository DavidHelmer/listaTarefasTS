import { AppError } from "../../errors/AppError"
import { Tarefa } from "../../models/Tarefa";
import { CreateData, User } from "../../models/User"

export const updateUserService = async ({ name, email, tarefaId }: CreateData, id): Promise<User> => {
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

    if (tarefaId && tarefaId.length > 0) {
        await Tarefa.update(
            { usuarioId: id },
            { where: { id: tarefaId } }
        )
    }

    await user.save();
    return user;
}