import {Controller, Post, Body} from '@nestjs/common';
import {CouponsService} from "./coupons.service";
import {CouponAndCouponUUIDDTO, CouponDTO, CouponTypeDTO} from "./coupons.dto";

@Controller('coupons')
export class CouponsController {
    constructor(private couponsService: CouponsService) {}
    // api for test to generate coupon
    @Post('create')
    async createCoupon(@Body() couponAndCouponUUIDDTO: CouponAndCouponUUIDDTO) {
        // fill this
    }

    @Post('create-type')
    async createCouponType(@Body() couponTypeDTO: CouponTypeDTO) {
        return await this.couponsService.createCouponType(couponTypeDTO);
    }
}
