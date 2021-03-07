import { Injectable } from '@nestjs/common';
import {CouponDTO, CouponTypeDTO, CouponUUIDDTO} from "./coupons.dto";
import {CouponType} from "./entities/couponTypes.entity";
import {CouponUUID} from "./entities/couponUUIDs.entity";
import {Coupon} from "./entities/coupons.entity";


@Injectable()
export abstract class AbstractCouponsRepository {
    abstract createCoupon(couponDTO: CouponDTO): Promise<Coupon>
    abstract createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType>;
    abstract createCouponUUID(couponUUIDDTO: CouponUUIDDTO): Promise<CouponUUID>;
    abstract createCouponUUIDSerial(): string;
}


/**
 * controller layer
 * service layer
 * repository layer
 * */