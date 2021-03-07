import { CreateUserDTO} from "./users.dto";
import { User } from './entities/user.entity'

export abstract class AbstractUsersRepository {
    abstract createUser(createUserDTO: CreateUserDTO): Promise<User | null>;
    abstract findByMail(mail: string): Promise<User>;
}