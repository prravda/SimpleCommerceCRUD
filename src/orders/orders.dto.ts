import {Coupon} from "../coupons/entities/coupons.entity";
import {Order} from "./entities/orders.entity";

export interface CreateOrderDTO {
    user_id: number;
    status_id: number;
    name: string;
    raw_price: number;
    currency: string;
    url: string;
    contact: string;
    redundant: boolean;
    coupons: Coupon[];
}

export interface CalculatePurchasedPriceDTO {
    coupons: Coupon[];
    raw_price: number;
    redundant: boolean;
};

export interface ChangeOrderStatusDTO {
    order_id: number;
    new_status: string;
}