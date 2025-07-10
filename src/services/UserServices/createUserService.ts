import { CreateData, User } from "../../models/User";
import { Task } from "../../models/Task";
import { AppError } from "../../errors/AppError";
import { UserSchemas } from "./schemas";


export const createUserService = async ({ name, email, taskId }: CreateData): Promise<User> => {
    await UserSchemas.createUser.validate({ name, email, taskId })

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

    if (taskId && taskId.length > 0) {
        await Task.update(
            { usuarioId: user.id },
            { where: { id: taskId } }
        )
    }

    return user
}