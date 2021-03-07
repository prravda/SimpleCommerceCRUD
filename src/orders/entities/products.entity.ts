import {Table, Column, Model, BelongsTo} from 'sequelize-typescript';
import {Order} from "./orders.entity";

@Table
export class Product extends Model {
    @Column
    name: string;

    @Column
    price: number;

    @Column
    currency: string;

    @Column
    url: string;

    @Column
    contact: string;

    //relation
    @BelongsTo(() => Order, 'product_id')
    order: Order
}
