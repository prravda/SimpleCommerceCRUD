import {Coupon} from "./entities/coupons.entity";
import {ApplyCouponsToOrderDTO, CreateCouponDTO, CouponTypeDTO} from "./coupons.dto";

import * as cryptoRandomString from "crypto-random-string";
import { CouponType } from "./entities/couponTypes.entity";
import {AbstractCouponsRepository} from "./coupons.abstract.repository";

export class CouponsRepository extends AbstractCouponsRepository {
    async createCoupon({ uuid, type_id, user_id = null, order_id = null, used}: CreateCouponDTO): Promise<Coupon> {
        return await Coupon.create({
            uuid: this.createUUID(),
            type_id: type_id,
            user_id: user_id? user_id : null,
            order_id: order_id? order_id : null,
            used: used
        });
    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
        const {
            coupon_name,
            discount_type,
            discount_value,
            refundable
        } = couponTypeDTO;
        return await CouponType.create({
            coupon_name: coupon_name,
            discount_type: discount_type,
            discount_value: discount_value,
            refundable: refundable,
        })
    };

    createUUID(): string {
        return cryptoRandomString({length: 10, type: "base64"});
    };

    async getCouponByUUID(uuid: string): Promise<Coupon> {
        return await Coupon.findOne({
            where: {
                uuid: uuid,
            }
        });
    };

    async getAllCouponsByOrderID(order_id: number): Promise<Coupon[]> {
        return await Coupon.findAll({
            where: {
                order_id: order_id,
            }
        })
    }

    async getAllCouponsByUserID(user_id: number): Promise<Coupon[]> {
        return await Coupon.findAll({
            where: {
                user_id: user_id,
            }
        });
    }

    async applyCouponsToOrder({ coupons, order_id }: ApplyCouponsToOrderDTO): Promise<void> {
        for (const eachCoupon of coupons) {
            await Coupon.update(
                {
                    order_id: order_id,
                    used: true,
                }, {
                    where: {
                        id: eachCoupon.id,
                    },
                });
        }
    };

    async rollbackCoupons(coupons: Coupon[]): Promise<void> {
        for (const eachCoupon of coupons) {
            if (eachCoupon.couponType.refundable) {
                await this.createCoupon({
                    uuid: this.createUUID(),
                    type_id: eachCoupon.type_id,
                    user_id: eachCoupon.user_id,
                    order_id: null,
                    used: false,
                } as CreateCouponDTO);
            }
        }
    }
}
