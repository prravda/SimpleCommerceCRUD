import { Injectable, Inject } from '@nestjs/common';
import { UserSignIn, UserSignUp, ICreatedOrFound } from "./interfaces/user.interface";
import { User } from './user.entity'
import {AbstractUsersRepository} from "./user.abstract.repository";
import {Coupon} from "../coupons/entities/coupons.entity";


@Injectable()
export class UsersRepository extends AbstractUsersRepository {
    // USER_REPOSITORY 라는 별도의 class 가 있고,
    // constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}
    // method chainning 뒤에 있는 <> 는 어떤 역할을 하는지 정확히 이해하기, 그리고 any 에서 적절한 type 을 집어넣어라

    // findOrCreate 대신 find 만 쓰고 이걸 service layer 에서만 error handling 을 하면된다.
    // 그리고 client side 에 유저가 있는지 없는지만 넘겨주면 되지, 왜 이미 존재하는 유저의 정보까지 넘겨주는건가? 그럴 필요가 없다!
    // 그렇기 때문에 mail column 에 unique 속성을 걸어주고, 그렇게 unique 한 값을 보장받은 다음, 만약 duplicate 이 일어나 query rejection 이 된다면
    // service layer 의 error handler 를 통해 처리해주면 된다. 끝
    async createUser({ name, mail, password }: UserSignUp): Promise<ICreatedOrFound> {
        try {
            const [user, isCreated] = await User.findOrCreate<any>({
                where: {
                    mail: mail,
                },
                defaults: {
                    name: name,
                    password: password,
                },
                raw: true,
            });
            return {
                user: user,
                isCreated: isCreated,
            } as ICreatedOrFound;
        } catch (e) {
            throw new Error('duplicated mail');
        }
    }

    async findByMail(mail: string): Promise<User | null> {
        const userResultByMail = await User.findOne({
            where: {
                mail: mail,
            },
            // include: [{
            //     model: Coupon,
            //     as: 'Coupon',
            // }],
            include: [Coupon]
        });
        if (!userResultByMail) {
            return null;
        }

        // console.log(userResultByMail.getCoupon());
        return userResultByMail;
        // console.log(userResultByMail instanceof User);
    }
}

/**
 * controller layer
 * service layer
 * repository layer
 * */