import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {OrdersService} from "./orders.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        OrdersService,

    ]
})
export class OrdersModule {}
