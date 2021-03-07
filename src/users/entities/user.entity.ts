import {Table, Column, Model, HasMany, Unique} from 'sequelize-typescript';
import {Coupon} from "../../coupons/entities/coupons.entity";
import {Order} from "../../orders/entities/orders.entity";

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
}