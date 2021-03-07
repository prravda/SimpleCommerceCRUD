import {Coupon} from "./entities/coupons.entity";

export interface CreateCouponDTO {
    uuid: string;
    type_id: number;
    user_id?: number;
    order_id?: number;
    used: boolean;
}

export interface CouponTypeDTO {
    coupon_name: string;
    discount_type: string;
    discount_value: number;
    refundable: boolean;
}

export interface ApplyCouponsToOrderDTO {
    coupons: Coupon[];
    order_id: number;
    redundant: boolean;
}