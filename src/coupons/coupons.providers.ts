import { Coupon } from "./entities/coupons.entity";
import {CouponType} from "./entities/couponTypes.entity";
import {CouponUUID} from "./entities/couponUUIDs.entity";

export const couponsProviders = [
    {
        provide: 'COUPONS_REPOSITORY',
        useValue: Coupon,
    },
    {
        provide: 'COUPON_TYPES_REPOSITORY',
        useValue: CouponType,
    },
    {
        provide: 'COUPON_UUIDS_REPOSITORY',
        useValue: CouponUUID,
    }
];