import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {UserSignIn} from "../users/interfaces/user.interface";
import {JwtService} from "@nestjs/jwt";

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
        if (user && user.password === password) {
            const { password, ...result } = user['dataValues'];
            return result;
        }
        return null;
    }

    async signin(user: any) {
        const payload = { mail: user.mail, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async cryptPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, CryptConfig.SaltRounds);
        return hashedPassword;
    }

    public async comparePassword(plain: string, hashed: string): Promise<boolean> {
       const result = await bcrypt.compare(plain, hashed);
       return result;
    }

    public async signup(user: any) {
        const { name, mail, password } = user;
        const hashedPasswrod = this.cryptPassword(password);
    }
}
