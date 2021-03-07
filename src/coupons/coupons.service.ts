import {HttpException, HttpStatus} from '@nestjs/common';
import {Coupon} from "./entities/coupons.entity";
import {CouponType} from "./entities/couponTypes.entity";
import {CouponsRepository} from "./coupons.repository";
import {
    ApplyCouponsToOrderDTO,
    CouponTypeDTO,
    CreateCouponDTO
} from "./coupons.dto";

export class CouponsService {
    private couponsRepository: CouponsRepository;
    constructor(couponsRepository: CouponsRepository) {
        this.couponsRepository = couponsRepository;
    }

    async createCoupon(createCouponDTO: CreateCouponDTO): Promise<Coupon> {
        try {
            return await this.couponsRepository.createCoupon(createCouponDTO);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-CreateCoupon: ${e}`, HttpStatus.BAD_REQUEST);
        }
    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
        try {
            return await this.couponsRepository.createCouponType(couponTypeDTO);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-CreateCouponType: ${e}`, HttpStatus.BAD_REQUEST);
        }
    };

    async getCouponByUUID(uuid: string): Promise<Coupon> {
        try {
            return await this.couponsRepository.getCouponByUUID(uuid);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-GetCouponByUUID: ${e}`, HttpStatus.BAD_REQUEST);
        }
    };

    async getAllCouponsByOrderID(order_id: number): Promise<Coupon[]> {
        try {
            return await this.couponsRepository.getAllCouponsByOrderID(order_id);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-GetAllCouponsByOrderID: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllCouponsByUserID(user_id: number): Promise<Coupon[]> {
        try {
            return await this.couponsRepository.getAllCouponsByOrderID(user_id);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-GetAllCouponsByUserID: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async applyCouponsToOrder(applyCouponsToOrderDTO: ApplyCouponsToOrderDTO): Promise<void> {
        try {
            await this.couponsRepository.applyCouponsToOrder(applyCouponsToOrderDTO);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-ApplyCouponsToOrder: ${e}`, HttpStatus.BAD_REQUEST);
        }
    };

    async rollbackCoupons(coupons: Coupon[]): Promise<void> {
        try {
            await this.rollbackCoupons(coupons);
        } catch(e) {
            console.log(e);
            throw new HttpException(`Error-RollbackCoupons: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }
}
