import { boolean, object, string } from "yup";

export class TarefaSchemas {
    static createTarefa = object({
        name: string().required('Você não adicionou o nome da tarefa'),
        description: string().required('Você não adicionou a descrição da tarefa'),
        urgent: boolean()
    })
}