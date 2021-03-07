import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {OrdersService} from "./orders.service";
import {OrdersRepository} from "./orders.repository";
import { OrdersController } from './orders.controller';
import {AuthModule} from "../auth/auth.module";
import {CouponsRepository} from "../coupons/coupons.repository";
import {CouponsModule} from "../coupons/coupons.module";

@Module({
    imports: [
        CouponsModule,
        DatabaseModule,
        AuthModule,
    ],
    providers: [
        CouponsRepository,
        OrdersRepository,
        OrdersService,
    ],
    controllers: [OrdersController]
})
export class OrdersModule {}
