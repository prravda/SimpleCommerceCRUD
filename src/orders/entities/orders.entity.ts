import {Table, Column, Model, BelongsTo, ForeignKey, HasOne, HasMany} from 'sequelize-typescript';
import {User} from "../../users/user.entity";
import {OrderStatus} from "./orderStatus.entity";
import {Product} from "./products.entity";
import {CouponUUID} from "../../coupons/entities/couponUUIDs.entity";

@Table
export class Order extends Model<Order> {
    @ForeignKey(() => User)
    @Column
    user_id: number;

    @ForeignKey(() => Product)
    @Column
    product_id: number;

    @ForeignKey(() => OrderStatus)
    @Column
    status_id: number;

    @Column
    redundant: boolean;


    //relation
    @HasOne(() => Product, 'product_id')
    product: Product

    @HasMany(() => CouponUUID, 'order_id')
    couponUUIDs: CouponUUID[]

    @BelongsTo(() => OrderStatus, 'status_id')
    order_status: OrderStatus

    @BelongsTo(() => User, 'user_id')
    user: User
}
