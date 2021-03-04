import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column
    name: string;

    @Column
    mail: string;

    @Column
    password: string;
}