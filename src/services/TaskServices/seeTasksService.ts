import { Task } from "../../models/Task"

export const seeTasksService = async (): Promise<Task[]> => {
    const tasks = await Task.findAll();
    return tasks;
}