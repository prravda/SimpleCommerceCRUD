import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {CouponsService} from "./coupons.service";
import { CouponsController } from './coupons.controller';
import {CouponsRepository} from "./coupons.repository";

@Module({
    imports: [DatabaseModule],
    providers: [
        CouponsService,
        CouponsRepository,
    ],
    controllers: [CouponsController],
    exports: [
        CouponsService,
        CouponsRepository,
    ],
})
export class CouponsModule {}
