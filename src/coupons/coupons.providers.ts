import { Coupon } from "./entities/coupons.entity";
import {CouponType} from "./entities/couponTypes.entity";

export const couponsProviders = [
    {
        provide: 'COUPONS_REPOSITORY',
        useValue: Coupon,
    },
    {
        provide: 'COUPON_TYPES_REPOSITORY',
        useValue: CouponType,
    },
];