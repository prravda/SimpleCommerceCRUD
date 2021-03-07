import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp, ICreatedOrFound } from "./interfaces/user.interface";
import { User } from './user.entity'


@Injectable()
export abstract class AbstractUsersRepository {
    abstract createUser({name, mail, password}: UserSignUp): Promise<ICreatedOrFound>;
    abstract findByMail(mail: string): Promise<User | null>;
}


/**
 * controller layer
 * service layer
 * repository layer
 * */