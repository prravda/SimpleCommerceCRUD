import {CreateUserDTO} from "./users.dto";
import { User } from './entities/user.entity'
import {AbstractUsersRepository} from "./users.abstract.repository";
import {HttpException, HttpStatus} from "@nestjs/common";

export class UsersRepository extends AbstractUsersRepository {
    async createUser({ name, mail, password }: CreateUserDTO): Promise<User> {
        const [user, isCreated] = await User.findOrCreate({
            where: {
                name: name,
            },
            defaults: {
                mail: mail,
                password: password,
            }
        });
        if (isCreated) {
            return user;
        }
        throw new HttpException('User Already Exist', HttpStatus.UNAUTHORIZED);
    }

    async findByMail(mail: string): Promise<User> {
        const userResultByMail = await User.findOne({
            where: {
                mail: mail,
            }
        });
        if (!userResultByMail) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return userResultByMail;
    }
}