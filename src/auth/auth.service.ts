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

    public async signup(userSignUp) {
        const { name, mail, password } = userSignUp;
        const hashedPassword = await this.cryptPassword(password);

        /**
         * instance 를 찍어내는 방법? class 도 있을거고(factory pattern...), 이게 제일 정석이다.
         * 그러나 통상적으로는 as 로 casting 을 해주면 된다... 뭐하러 굳이?
         */

        const { user, isCreated } = await this.userService.createUser({
            name: name,
            mail: mail,
            password: hashedPassword,
        } as UserSignUp);

        if (isCreated) {
            const { password, ...result } = user['dataValues'];
            return result;
        }
        return 'your mail is duplicated, check again';
    }

    // 접근자를 잘 써라. 외부에서 사용할 일이 없는 method 는 전부 private 으로!
    private async cryptPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, Number(CryptConfig.SaltRounds));
        return hashedPassword;
    }

    private async comparePassword(plain: string, hashed: string): Promise<boolean> {
       const result = await bcrypt.compare(plain, hashed);
       return result;
    }
}
