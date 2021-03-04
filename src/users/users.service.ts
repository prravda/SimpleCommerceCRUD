import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp } from "./interfaces/user.interface";
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}

    async createUser({ name, mail, password }: UserSignUp): Promise<User | string> {
        const [userToCreate, isCreated] = await this.usersRepository.findOrCreate({
            where: {
                name: name,
                password: password,
                mail: mail,
            }
        });
        if (isCreated) {
            return userToCreate;
        }
        return `name or mail is duplicated`;
    }

    async findUser({ mail, password }: UserSignIn): Promise<User | string> {
        const userSignIn = await this.usersRepository.findOne({
            where: {
                mail: mail,
            }
        });
        if (userSignIn === null) {
           return 'check your mail or password again';
        }
        return userSignIn;
    }

    async findByMail(mail: string): Promise<User> {
        const userResultByMail = await this.usersRepository.findOne({
            where: {
                mail: mail,
            }
        });
        return userResultByMail;
    }
}
