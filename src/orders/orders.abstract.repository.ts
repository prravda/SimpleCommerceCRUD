import {CalculatePurchasedPriceDTO, ChangeOrderStatusDTO, CreateOrderDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";

export abstract class AbstractOrdersRepository {
    abstract createOrder(createOrderDTO: CreateOrderDTO): Promise<Order>;
    abstract getOrdersByUserID(user_id: number): Promise<Order[]>;
    abstract calculatePurchasedPrice(calculatePurchasedPriceDTO: CalculatePurchasedPriceDTO): number;
    abstract calculatePriceWithCoupon(calculatePurchasePriceDTO: CalculatePurchasedPriceDTO): number;
}