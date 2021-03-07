import {CouponDTO, CouponTypeDTO, CouponUUIDDTO} from "./coupons.dto";
import {CouponType} from "./entities/couponTypes.entity";
import {Coupon} from "./entities/coupons.entity";

export abstract class AbstractCouponsRepository {
    abstract createCoupon(couponDTO: CouponDTO): Promise<Coupon>
    abstract createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType>;
    abstract createCouponUUIDSerial(): string;
}


/**
 * controller layer
 * service layer
 * repository layer
 * */