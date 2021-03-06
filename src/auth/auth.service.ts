import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {UserSignIn, UserSignUp} from "../users/interfaces/user.interface";
import {JwtService} from "@nestjs/jwt";

import { User } from '../users/user.entity';

import { CryptConfig } from "../config";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(mail: string, password: string): Promise<any> {
        const user = await this.userService.findByMail(mail);
        const isRightPassword = await this.comparePassword(password, user.password);

        if (isRightPassword) {
            const { password, ...result } = user;
            console.log(result['dataValues']);
            return result['dataValues'];
        }

        return null;
    }

    async signin(user: User) {
        const payload = {
            id: user.id,
            mail: user.mail,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async signup(userSignIn) {
        const { name, mail, password } = userSignIn;
        const hashedPassword = await this.cryptPassword(password);

        const { user, isCreated } = await this.userService.createUser({
            name: name,
            mail: mail,
            password: hashedPassword,
        });

        if (isCreated) {
            const { password, ...result } = user['dataValues'];
            return result;
        }
        return 'your mail is duplicated, check again';
    }

    public async cryptPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, Number(CryptConfig.SaltRounds));
        return hashedPassword;
    }

    public async comparePassword(plain: string, hashed: string): Promise<boolean> {
       const result = await bcrypt.compare(plain, hashed);
       return result;
    }
}
