import { CreateData, User } from "../../models/User";
import { Tarefa } from "../../models/Tarefa";
import { AppError } from "../../errors/AppError";
import { UserSchemas } from "./schemas";


export const createUserService = async ({ name, email, tarefaId }: CreateData): Promise<User> => {
    await UserSchemas.createUser.validate({ name, email, tarefaId })

    const userExists = await User.findOne({
        where: { email: email }
    })

    if (userExists) {
        throw new AppError('Email já cadastrado');
    }

    const user = await User.create({
        name,
        email,
    })

    if (tarefaId && tarefaId.length > 0) {
        await Tarefa.update(
            { usuarioId: user.id },
            { where: { id: tarefaId } }
        )
    }

    return user
}