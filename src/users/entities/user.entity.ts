import {Table, Column, Model, HasMany, Unique, BeforeCreate} from 'sequelize-typescript';
import {Coupon} from "../../coupons/entities/coupons.entity";
import {Order} from "../../orders/entities/orders.entity";
import * as cryptoRandomString from "crypto-random-string";

@Table
export class User extends Model {
    @Column
    name: string;

    @Unique
    @Column
    mail: string;

    @Column
    password: string;

    // relation
    @HasMany(() => Coupon, 'user_id')
    coupons: Coupon[]

    @HasMany(() => Order,'user_id' )
    orders: Order[]

    @BeforeCreate
    static async issueDefaultCoupon(instance: User) {
        // 기본 coupon ID 를 배열을 현재는 하드코딩 하였으나, 이런 식으로 기본 coupon 의 id 를 담은 배열을 만들어놓고 
        // 그 배열을 기준으로 user 가 생성될 때 coupon 을 create 해주는 방식을 생각중이었습니다.
        const mendentoryCouponIDArray = [1, 2];
        for (const eachCouponID of mendentoryCouponIDArray) {
            await Coupon.create({
                 uuid: cryptoRandomString({length: 10, type: "base64"}),
                 user_id: instance.id,
                 type_id: eachCouponID,
                 order_id: null,
                 used: false,
            });
        };
    };
}