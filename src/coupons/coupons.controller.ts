import {Controller, Post, Body} from '@nestjs/common';
import {CouponsService} from "./coupons.service";
import {CouponDTO} from "./coupons.dto";

@Controller('coupons')
export class CouponsController {
    constructor(private couponsService: CouponsService) {}
    // api for test to generate coupon
    @Post('create')
    async createCoupon(@Body() couponDTO: CouponDTO) {
        return await this.couponsService.createCoupon(couponDTO);
    }
}
