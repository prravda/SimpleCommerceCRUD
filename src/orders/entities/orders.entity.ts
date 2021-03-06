import {Table, Column, Model, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {User} from "../../users/user.entity";

@Table
export class Order extends Model<Order> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    user_id: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    redundant: boolean;

    @BelongsTo(() => User)
    user: User
}
