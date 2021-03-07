import {Inject, Injectable} from '@nestjs/common';
import {Coupon} from "./entities/coupons.entity";
import {CouponDTO, CouponTypeDTO, CouponUUIDDto} from "./coupons.dto";

import * as cryptoRandomString from "crypto-random-string";
import { CouponType } from "./entities/couponTypes.entity";
import {CouponUUID} from "./entities/couponUUIDs.entity";
import {AbstractCouponsRepository} from "./coupon.abstract.repository";

@Injectable()
export class CouponsRepository extends AbstractCouponsRepository {

    async createCoupon(couponDTO: CouponDTO): Promise<Coupon> {
        try {
            const { type_id, uuid_id, used } = couponDTO;
            const generatedCoupon = await Coupon.create({
                type_id: type_id,
                uuid_id: uuid_id,
                used: used,
            });
            return generatedCoupon;
        } catch (e) {
            throw new Error('check your coupon generating info again');
        }
    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
        try {
            const {
                coupon_name,
                discount_type,
                discount_value,
                refundable
            } = couponTypeDTO;
            const generatedCouponType = await CouponType.create({
                coupon_name: coupon_name,
                discount_type: discount_type,
                discount_value: discount_value,
                refundable: refundable,
            })
            return generatedCouponType;
        } catch (e) {
            throw new Error('check your coupon type generating info again')
        }
    };

    createCouponUUIDSerial(): string {
        return cryptoRandomString({
            length: 15,
            type: "base64",
        });
    };

    async createCouponUUID(couponUUIDDTO: CouponUUIDDto): Promise<CouponUUID> {
        try {
            const {
                uuid_serial = this.createCouponUUIDSerial(),
                user_id = null,
                order_id = null,
            } = couponUUIDDTO;

            const generatedCouponUUID = await CouponUUID.create({
                uuid_serial: uuid_serial,
                user_id: user_id,
                order_id: order_id,
            });

            return generatedCouponUUID;
        } catch (e) {
            throw new Error('check your coupon uuid generating info again');
        }
    };
}
