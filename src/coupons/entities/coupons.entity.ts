import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    Default,
    AllowNull, Unique,
} from 'sequelize-typescript';
import { CouponType } from "./couponTypes.entity";
import {Order} from "../../orders/entities/orders.entity";
import {User} from "../../users/entities/user.entity";

@Table
export class Coupon extends Model {
    @Unique
    @Column
    uuid: string;

    @AllowNull
    @ForeignKey(() => CouponType)
    @Column
    type_id: number;

    @AllowNull
    @ForeignKey(() => User)
    @Column
    user_id: number;

    @AllowNull
    @ForeignKey(() => Order)
    @Column
    order_id: number;

    @Default(false)
    @Column
    used: boolean;

    // relation
    @BelongsTo(() => User, 'user_id')
    user: User
    @BelongsTo(() => CouponType, 'type_id')
    couponType: CouponType
    @BelongsTo(() => Order, 'order_id')
    order: Order
}