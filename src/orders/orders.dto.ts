export interface CouponDTO {
    type_id: number;
    uuid_id?: number;
    used?: boolean;
}

export interface CouponTypeDTO {
    coupon_name: string;
    discount_type: string;
    discount_value: number;
    refundable: boolean;
}

export interface CouponUUIDDTO {
    user_id?: number;
    order_id?: number;
}

export interface CouponAndCouponUUIDDTO {
    couponDTO: CouponDTO;
    couponUUIDDTO?: CouponUUIDDTO;
}