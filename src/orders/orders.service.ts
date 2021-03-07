import {CalculatePurchasedPriceDTO, ChangeOrderStatusDTO, CreateOrderDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";
import {OrderStatus} from "./entities/orderStatus.entity";
import {OrdersRepository} from "./orders.repository";
import {HttpException, HttpStatus} from "@nestjs/common";
import {CouponsRepository} from "../coupons/coupons.repository";
import {ApplyCouponsToOrderDTO} from "../coupons/coupons.dto";

export class OrdersService {
    private ordersRepository: OrdersRepository;
    private couponsRepository: CouponsRepository;
    constructor(
        ordersRepository: OrdersRepository,
        couponsRepository: CouponsRepository,
        ) {
        this.ordersRepository = ordersRepository;
        this.couponsRepository = couponsRepository;
    };

    async createOrder({ user_id, status_id, name, raw_price, currency, url, contact, redundant, coupons }: CreateOrderDTO): Promise<Order> {
        try {
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
            await this.couponsRepository.applyCouponsToOrder({ coupons: coupons, order_id: order.id } as ApplyCouponsToOrderDTO);
            return order;
        } catch (e) {
            console.log(e);
            throw new HttpException(`Error-CreateOrder: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getOrdersByUserID(user_id: number): Promise<Order[]> {
        try {
            return await Order.findAll({
                where: {
                    user_id: user_id,
                }
            });
        } catch (e) {
            console.log(e);
            throw new HttpException(`Error-GetOrdersByUserID: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async findOrderStatusIDByStatus(status: string): Promise<OrderStatus> {
        try {
            return await OrderStatus.findOne({
                where: {
                    status: status,
                },
                attributes: ['id'],
            });
        } catch (e) {
            console.log(e);
            throw new HttpException(`Error-FindOrderStatusIDByStatus: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async changeOrderStatus({ order_id, new_status }: ChangeOrderStatusDTO): Promise<void> {
        try {
            switch (new_status) {
                // 주문이 반려되는 경우에는 해당 order_id 에 적용된 모든 쿠폰들을 roll back 합니다.
                case 'Rejected':
                    const appliedCoupons = await this.couponsRepository.getAllCouponsByOrderID(order_id);
                    await this.couponsRepository.rollbackCoupons(appliedCoupons);
                    break;
                // 경우에 없던 주문 유형이라면, Unauthorized 라는 걸 error message 로 알립니다.
                default:
                    throw new HttpException('Invalid Order Status', HttpStatus.UNAUTHORIZED);
            }

            const new_status_id = await this.findOrderStatusIDByStatus(new_status);
            await Order.update(
                {
                    status_id: new_status_id,
                },
                {
                    where: {
                        id: order_id,
                    }
                }
            );
        } catch (e) {
            console.log(e);
            throw new HttpException(`Error-ChangeOrderStatus: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    calculatePriceWithCoupon({ coupons, raw_price, redundant }: CalculatePurchasedPriceDTO): number {
        try {
            // 적용한 쿠폰이 없다면 raw price 를 그대로 return
            if (coupons.length > 0) {
                return raw_price;
            }
            // 적용한 쿠폰이 있다면 쿠폰을 적용한 가격을 계산하는 method 의 parameter 로 호출
            return this.calculatePurchasedPrice({ coupons: coupons, raw_price: raw_price, redundant: redundant } as CalculatePurchasedPriceDTO);
        } catch (e) {
            console.log(e);
            throw new HttpException(`Error-CalculatePriceWithCoupon: ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

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
}
