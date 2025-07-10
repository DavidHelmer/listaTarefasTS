import { boolean, object, string } from "yup";

export class TaskSchemas {
    static createTask = object({
        name: string().required('Você não adicionou o nome da task'),
        description: string().required('Você não adicionou a descrição da task'),
        urgent: boolean()
    })
}