import { array, number, object, string } from "yup";

export class UserSchemas {
    static createUser = object({
        name: string().required('Você não adicionou o nome do usuário'),
        email: string().required('Você não adicionou o email do usuário'),
        tarefaId: array().of(number()).min(1)
    });
}