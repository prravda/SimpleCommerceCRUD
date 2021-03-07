import {CreateUserDTO} from "./users.dto";
import { User } from './entities/user.entity'
import { UsersRepository } from "./users.repository";

export class UsersService {
    private usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser({ name, mail, password }: CreateUserDTO): Promise<User | null> {
        try {
            return await this.usersRepository.createUser({name, mail, password} as CreateUserDTO);
        }
        catch(e) {
            throw new Error('CreateUser-ServiceError: check again');
        }
    }

    // 관심사 분리 원칙에 따라 코드 정리하기
    async findByMail(mail: string): Promise<User> {
        try {
            const userResultByMail = await this.usersRepository.findByMail(mail);
            if (userResultByMail === null) {
                throw new Error('user does not exist');
            }
            return userResultByMail as User;
        }
        catch (e) {
            throw new Error('FindByMail-ServiceError: check again');
        }
    }
}
