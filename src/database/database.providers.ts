import { Sequelize} from "sequelize-typescript";
import { User } from '../users/user.entity';
import {CouponType} from "../coupons/entities/couponTypes.entity";
import {Coupon} from "../coupons/entities/coupons.entity";
import {CouponUUID} from "../coupons/entities/couponUUIDs.entity";
import {Order} from "../orders/entities/orders.entity";
import {OrderStatus} from "../orders/entities/orderStatus.entity";
import {Product} from "../orders/entities/products.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PW,
                database: process.env.DB_NAME,
            });
            sequelize.addModels([
                User,
                Coupon,
                CouponType,
                CouponUUID,
                Order,
                OrderStatus,
                Product,
            ]);
            await sequelize.sync();
            return sequelize;
        }
    }
]