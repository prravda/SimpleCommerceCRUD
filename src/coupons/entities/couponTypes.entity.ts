import {
    Table,
    Column,
    Model,
    HasMany
} from 'sequelize-typescript';
import { Coupon } from "./coupons.entity";

@Table
export class CouponType extends Model {
    @Column
    coupon_name: string;

    @Column
    discount_type: string;

    @Column
    discount_value: number;

    @Column
    refundable: boolean;

    // relation
    @HasMany(() => Coupon, 'type_id')
    coupons: Coupon[]
}