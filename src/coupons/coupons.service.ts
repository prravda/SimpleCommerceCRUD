import {Inject, Injectable} from '@nestjs/common';
import {Coupon} from "./entities/coupons.entity";

import * as cryptoRandomString from "crypto-random-string";
import {CouponType} from "./entities/couponTypes.entity";
import {CouponsRepository} from "./coupons.repository";
import {CouponAndCouponUUIDDTO, CouponDTO, CouponTypeDTO, CouponUUIDDTO} from "./coupons.dto";
import {CouponUUID} from "./entities/couponUUIDs.entity";

@Injectable()
export class CouponsService {
    private couponsRepository: CouponsRepository;
    constructor(couponsRepository: CouponsRepository) {
        this.couponsRepository = couponsRepository;
    }

    async createCouponUUIDAndCoupon(couponAndCouponUUIDDTO: CouponAndCouponUUIDDTO): Promise<CouponDTO> {
        try {
            return await this.couponsRepository.createCouponUUIDAndCoupon(couponAndCouponUUIDDTO);
        } catch (e) {
            throw e;
        }
    }

    async createCoupon(couponDTO: CouponDTO): Promise<Coupon> {
        try {
            return await this.couponsRepository.createCoupon(couponDTO);
        } catch (e) {
            throw new Error('CreateCouponError: check parameters again');
        }

    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
        try {
            return await this.couponsRepository.createCouponType(couponTypeDTO);
        } catch (e) {
            throw new Error('CreateCouponTypeError: check parameters again');
        }
    };

    async createCouponUUID(couponUUIDDTO: CouponUUIDDTO): Promise<CouponUUID> {
        try {
            return await this.couponsRepository.createCouponUUID(couponUUIDDTO);
        }
        catch (e) {
            throw new Error('CreateCouponUUIDError: check parameter again');
        }
    };

    async setCouponUsed(id: number): Promise<void> {
        try {
            await this.couponsRepository.setCouponUsed(id);
        } catch (e) {
            throw new Error('SetCouponUsedError: coupon status is not updated');
        }
    }
}
