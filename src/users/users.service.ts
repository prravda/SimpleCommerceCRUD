import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp } from "./interfaces/user.interface";
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}

    async createUser({ name, mail, password }: UserSignUp): Promise<any> {
        return await this.usersRepository.create<any>({
            name: name,
            mail: mail,
            password: password,
        });
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
