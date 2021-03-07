import {User} from "../users/entities/user.entity";

export const removePassword = (data: User) => {
    const { password, ...result } = data;
    return result;
};