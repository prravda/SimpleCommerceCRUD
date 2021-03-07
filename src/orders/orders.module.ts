import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {OrdersService} from "./orders.service";
import {OrdersRepository} from "./orders.repository";

@Module({
    imports: [DatabaseModule],
    providers: [
        OrdersService,
        OrdersRepository,
    ]
})
export class OrdersModule {}
