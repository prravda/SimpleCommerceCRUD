import {Inject, Injectable} from '@nestjs/common';
import {Coupon} from "./entities/coupons.entity";

import * as cryptoRandomString from "crypto-random-string";
import {CouponType} from "./entities/couponTypes.entity";
import {CouponsRepository} from "./coupons.repository";
import {CouponDTO, CouponTypeDTO, CouponUUIDDto} from "./coupons.dto";
import {CouponUUID} from "./entities/couponUUIDs.entity";

@Injectable()
export class CouponsService {
    private couponsRepository: CouponsRepository;
    constructor(couponsRepository: CouponsRepository) {
        this.couponsRepository = couponsRepository;
    }

    async createCoupon(couponDTO: CouponDTO): Promise<Coupon> {
       return await this.couponsRepository.createCoupon(couponDTO);
    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
       return await this.couponsRepository.createCouponType(couponTypeDTO);
    };

    async createCouponUUID(couponUUIDDTO: CouponUUIDDto): Promise<CouponUUID> {
        return await this.couponsRepository.createCouponUUID(couponUUIDDTO);
    }

}
