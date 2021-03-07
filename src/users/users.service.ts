import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp, ICreatedOrFound } from "./interfaces/user.interface";
import { User } from './user.entity'
import { UsersRepository } from "./users.repository";
import {AbstractUsersRepository} from "./user.abstract.repository";


@Injectable()
// 그냥 userRepository 를 받으면 service layer 에서 injection 이 됨
//
export class UsersService {
    private usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }


    // method chainning 뒤에 있는 <> 는 어떤 역할을 하는지 정확히 이해하기, 그리고 any 에서 적절한 type 을 집어넣어라
    async createUser({ name, mail, password }: UserSignUp): Promise<ICreatedOrFound> {
        const result = await this.usersRepository.createUser({name, mail, password} as UserSignUp);
        return result;
    }

    // 관심사 분리 원칙에 따라 코드 정리하기
    async findByMail(mail: string): Promise<User> {
        const userResultByMail = await this.usersRepository.findByMail(mail);
        if (userResultByMail === null) {
            throw new Error('user does not exist');
        }
        return userResultByMail as User;
    }
}
