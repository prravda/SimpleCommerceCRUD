import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {UserSignIn} from "../users/interfaces/user.interface";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}
    // 같은 형태의 값으로 넘겨주는 과정을 제대로 처리하지 못 해 Unauthorized 를 return 한다.
    // 일어나서 이 부분을 다시 잡아봅시다.
    async validateUser({ mail, password }: UserSignIn): Promise<any> {
        const user = await this.userService.findByMail(mail);
        if (user && user.password === password) {
            const { password, ...result } = user;
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
}
