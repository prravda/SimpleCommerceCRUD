import {CreateUserDTO} from "./users.dto";
import { User } from './entities/user.entity'
import { UsersRepository } from "./users.repository";

// service logic 은 어차피 auth 에서 가져다 쓰니 필요가 없을거같습니다.

// 그냥 userRepository 를 받으면 service layer 에서 injection 이 됨
export class UsersService {
    private usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    // method chainning 뒤에 있는 <> 는 어떤 역할을 하는지 정확히 이해하기, 그리고 any 에서 적절한 type 을 집어넣어라
    async createUser({ name, mail, password }: CreateUserDTO): Promise<User | null> {
        try {
            return await this.usersRepository.createUser({name, mail, password} as CreateUserDTO);
            const result = await this.usersRepository.createUser({name, mail, password} as CreateUserDTO);
            console.log(result);
            return result;
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
