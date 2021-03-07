import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDTO, SignInUserDTO} from "../users/users.dto";
import {JwtService} from "@nestjs/jwt";

import { User } from '../users/entities/user.entity';

import { CryptConfig } from "../config";
import * as bcrypt from 'bcrypt';

import { UsersRepository } from "../users/users.repository";
import {CouponsService} from "../coupons/coupons.service";

import { CouponUUIDDTO } from "../coupons/coupons.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private couponsService: CouponsService,
    ) {}

    async validateUser(mail: string, password: string): Promise<any> {
        const user = await this.usersRepository.findByMail(mail);
        const isRightPassword = await this.comparePassword(password, user.password);

        if (isRightPassword) {
            const { password, ...result } = user;
            return result['dataValues'];
        }
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    async signin(user: User) {
        try {
            const payload = {
                id: user.id,
                mail: user.mail,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (e) {
            throw new Error('SignInUser-AuthError: check parameter again');
        }
    }

    public async signup({ name, mail, password }: CreateUserDTO) {
        // try {
            const hashedPassword = await this.cryptPassword(password);

            const createdUser = await this.usersRepository.createUser({
                name: name,
                mail: mail,
                password: hashedPassword,
            } as CreateUserDTO);

            if (createdUser === null) {
                return new Error('CreateUser-AuthError: duplicated mail');
            }
            const couponUUIDInfo = { user_id: createdUser.id, order_id: null } as CouponUUIDDTO;
            this.couponsService.createCouponUUIDAndCoupon()
            return createdUser;

        // } catch(e) {
        //     throw new Error('CreateUser-AuthError: check parameter again')
        // }
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
