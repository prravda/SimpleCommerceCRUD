import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    Default,
    AllowNull,
} from 'sequelize-typescript';
import { CouponType } from "./couponTypes.entity";
import { CouponUUID } from "./couponUUIDs.entity";

@Table
export class Coupon extends Model {
    // allowing null to handle create coupon without user
    @AllowNull
    @ForeignKey(() => CouponType)
    @Column
    type_id: number;

    @AllowNull
    @ForeignKey(() => CouponType)
    @Column
    uuid_id: number;

    @Default(false)
    @Column
    used: boolean;

    // relation
    @BelongsTo(() => CouponUUID, 'uuid_id')
    couponUUID: CouponUUID

    @BelongsTo(() => CouponType, 'type_id')
    couponType: CouponType
}