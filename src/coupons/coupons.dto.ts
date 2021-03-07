export interface CouponDTO {
    type_id: number;
    uuid_id: number;
    used: boolean;
}

export interface CouponTypeDTO {
    coupon_name: string;
    discount_type: string;
    discount_value: number;
    refundable: boolean;
}

export interface CouponUUIDDto {
    uuid_serial?: string;
    user_id?: number;
    order_id?: number;
}