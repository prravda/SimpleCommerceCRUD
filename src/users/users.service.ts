import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp, ICreatedOrFound } from "./interfaces/user.interface";
import { User } from './user.entity'
import {Sequelize} from "sequelize";


@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}

    async createUser({ name, mail, password }: UserSignUp): Promise<ICreatedOrFound> {
        const [user, isCreated] = await this.usersRepository.findOrCreate<any>({
            where: {
                mail: mail,
            },
            defaults: {
                name: name,
                password: password,
            },
            raw: true,
        });
        return {
            user: user,
            isCreated: isCreated,
        }
    }

    async findByMail(mail: string): Promise<User | null> {
        const userResultByMail = await this.usersRepository.findOne({
            where: {
                mail: mail,
            }             
        });
        return userResultByMail;
    }
}
