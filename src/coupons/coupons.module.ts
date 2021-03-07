import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {CouponsService} from "./coupons.service";
import {couponsProviders} from "./coupons.providers";
import { CouponsController } from './coupons.controller';
import {CouponsRepository} from "./coupons.repository";

@Module({
    imports: [DatabaseModule],
    providers: [
        CouponsService,
        CouponsRepository,
        // ...couponsProviders,
    ],
    controllers: [CouponsController],
    exports: [CouponsService],
})
export class CouponsModule {}
