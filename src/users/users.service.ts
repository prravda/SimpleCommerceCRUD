import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp } from "./interfaces/user.interface";
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}

    // 일단은 pw를 제외한 user info 를 보내주어야 해서 임시로 any type 을 걸어놓았음
    // dto 를 중복되는 코드없이 깔끔하게 짜보자
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

    async findByMail(mail: string): Promise<User | null> {
        const userResultByMail = await this.usersRepository.findOne({
            where: {
                mail: mail,
            }
        });
        return userResultByMail;
    }
}
