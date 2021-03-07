import {AbstractOrdersRepository} from "./orders.abstract.repository";
import {Order} from "./entities/orders.entity";
import {CalculatePurchasedPriceDTO, ChangeOrderStatusDTO, CreateOrderDTO} from "./orders.dto";
import {ApplyCouponsToOrderDTO} from "../coupons/coupons.dto";
import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {OrderStatus} from "./entities/orderStatus.entity";

export class OrdersRepository  extends AbstractOrdersRepository {
    async createOrder({ user_id, status_id, name, raw_price, currency, url, contact, redundant, coupons }: CreateOrderDTO): Promise<Order> {
        const purchased_price = this.calculatePriceWithCoupon({ coupons, raw_price, redundant } as CalculatePurchasedPriceDTO);
        const order = await Order.create({
            user_id: user_id,
            status_id: status_id,
            raw_price: raw_price,
            purchased_price: purchased_price,
            currency: currency,
            url: url,
            contact: contact,
            redundant: redundant,
        });
        return order;
    };

    async getOrdersByUserID(user_id: number): Promise<Order[]> {
        return await Order.findAll({
            where: {
                user_id: user_id,
            }
        });
    };

    async findOrderStatusIDByStatus(status: string): Promise<OrderStatus> {
        return await OrderStatus.findOne({
            where: {
                status: status,
            },
            attributes: ['id'],
        });
    };

    calculatePriceWithCoupon({ coupons, raw_price, redundant }: CalculatePurchasedPriceDTO): number {
        // 적용한 쿠폰이 없다면 raw price 를 그대로 return
        if (coupons.length > 0) {
            return raw_price;
        }
        // 적용한 쿠폰이 있다면 쿠폰을 적용한 가격을 계산하는 method 의 parameter 로 호출
        return this.calculatePurchasedPrice({ coupons: coupons, raw_price: raw_price, redundant: redundant } as CalculatePurchasedPriceDTO);
    };

    calculatePurchasedPrice(calculatePurchasedPriceDTO: CalculatePurchasedPriceDTO): number {
        const { redundant, coupons, raw_price } = calculatePurchasedPriceDTO;

        // 중복 적용이 불가능한 주문 건인데, 1개보다 많은 쿠폰을 선택한 경우
        if (!redundant && coupons.length > 1) {
            throw new HttpException('Only one coupon could be applied to this product, choose one coupon', HttpStatus.BAD_REQUEST);
        }

        // 쿠폰을 적용해 계산한 새로운 가격을 적용하기 위한 변수
        let priceAppliedCoupons = raw_price;
        coupons.forEach(eachCoupon => {
            switch (eachCoupon.couponType.discount_type) {
                // N 원만큼의 할인이 들어가는 경우
                case 'Absolute':
                    priceAppliedCoupons = priceAppliedCoupons - eachCoupon.couponType.discount_value;
                    break;
                // N 퍼센트만큼의 할인이 들어가는 경우
                case 'Percentage':
                    priceAppliedCoupons = priceAppliedCoupons * (1 - (eachCoupon.couponType.discount_value * 0.01));
                    break;
                // 예상에 없는 쿠폰이 들어오는 경우
                default:
                    throw new HttpException(`Invalid coupon, check ${eachCoupon.couponType.coupon_name} coupon again`, HttpStatus.UNAUTHORIZED);
            }
        });
        return priceAppliedCoupons;
    };
};