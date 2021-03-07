import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {OrdersService} from "./orders.service";
import {OrdersRepository} from "./orders.repository";
import { OrdersController } from './orders.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        OrdersService,
        OrdersRepository,
    ],
    controllers: [OrdersController]
})
export class OrdersModule {}
