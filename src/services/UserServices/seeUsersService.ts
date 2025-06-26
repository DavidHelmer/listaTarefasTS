import { User } from "../../models/User"

export const seeUsersService = async (): Promise<User[]> => {
    const users = await User.findAll();
    return users;
}