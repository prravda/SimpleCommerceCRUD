import {CreateOrderDTO, CreateOrderStatusDTO, CreateProductDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";
import {OrderStatus} from "./entities/orderStatus.entity";

export abstract class AbstractOrdersRepository {
    abstract createOrder(createOrderDTO: CreateOrderDTO): Promise<Order>;
    abstract createOrderStatus(createOrderStatusDTO: CreateOrderStatusDTO): Promise<OrderStatus>;
}