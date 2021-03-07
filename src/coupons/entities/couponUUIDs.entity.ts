import {Table, Column, Model, BelongsTo, HasOne, AllowNull, Unique, Default, ForeignKey} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CouponType } from "./couponTypes.entity";
import {Coupon} from "./coupons.entity";
import {Order} from "../../orders/entities/orders.entity";

@Table
export class CouponUUID extends Model {
    @Unique
    @Column
    uuid_serial: string;

    @ForeignKey(() => User)
    @AllowNull
    @Default(null)
    @Column
    user_id: number;

    @ForeignKey(() => Order)
    @AllowNull
    @Default(null)
    @Column
    order_id: number;

    // relation
    @HasOne(() => Coupon, 'uuid_id')
    coupon: Coupon

    @BelongsTo(() => User, 'user_id')
    user: User

    @BelongsTo(() => CouponType, 'type_id')
    couponType: CouponType
}