import {CreateCouponDTO, CouponTypeDTO, ApplyCouponsToOrderDTO} from "./coupons.dto";
import {CouponType} from "./entities/couponTypes.entity";
import {Coupon} from "./entities/coupons.entity";

export abstract class AbstractCouponsRepository {
    abstract createCoupon(createCouponDTO: CreateCouponDTO): Promise<Coupon>
    abstract createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType>;
    abstract createUUID(): string;
    abstract getCouponByUUID(uuid: string): Promise<Coupon>;
    abstract applyCouponsToOrder(applyCouponsToUserDTO: ApplyCouponsToOrderDTO): Promise<void>;
    abstract rollbackCoupons(coupons: Coupon[]): Promise<void>;
    abstract getAllCouponsByOrderID(order_id: number): Promise<Coupon[]>;
    abstract getAllCouponsByUserID(user_id: number): Promise<Coupon[]>;
}