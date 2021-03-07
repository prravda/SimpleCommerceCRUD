import {Table, Column, Model, BelongsTo, ForeignKey, HasMany, AllowNull, Default} from 'sequelize-typescript';
import {User} from "../../users/entities/user.entity";
import {OrderStatus} from "./orderStatus.entity";
import {Coupon} from "../../coupons/entities/coupons.entity";

@Table
export class Order extends Model {
    @ForeignKey(() => User)
    @Column
    user_id: number;

    @ForeignKey(() => OrderStatus)
    @Column
    status_id: number;

    @Column
    product_name: string;

    @Column
    raw_price: number;

    @AllowNull
    @Column
    purchased_price: number;

    @Default('KRW')
    @Column
    currency: string;

    @Column
    url: string;

    @Column
    contact: string;

    @Default(false)
    @Column
    redundant: boolean;


    //relation
    @HasMany(() => Coupon, 'order_id')
    coupons: Coupon[]

    @BelongsTo(() => OrderStatus, 'status_id')
    order_status: OrderStatus

    @BelongsTo(() => User, 'user_id')
    user: User
}
