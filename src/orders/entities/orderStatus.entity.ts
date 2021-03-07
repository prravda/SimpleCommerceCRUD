import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {User} from "../../users/user.entity";
import {Order} from "./orders.entity";

@Table
export class OrderStatus extends Model {
    @Column
    status: string;

    @HasMany(() => Order, 'status_id')
    orders: Order[]
}
