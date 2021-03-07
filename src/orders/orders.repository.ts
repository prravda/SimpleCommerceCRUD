import {AbstractOrdersRepository} from "./orders.abstract.repository";
import {SetOrderStatusDTO, CreateOrderDTO, CreateOrderStatusDTO, CreateProductDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";
import {OrderStatus} from "./entities/orderStatus.entity";

export class OrdersRepository extends AbstractOrdersRepository {
    async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
        const { user_id, product_id, status_id, purchased_price, redundant } = createOrderDTO;
        return await Order.create(
            {
            user_id: user_id,
            product_id: product_id,
            status_id: status_id,
            purchased_price: purchased_price,
            redundant: redundant,
            },
            {

            }
        );
    }
    async createOrderStatus(createOrderStatusDTO: CreateOrderStatusDTO): Promise<OrderStatus> {
        const { status } = createOrderStatusDTO;
        return await OrderStatus.create({
            status: status,
        });
    }

    async setOrderStatus(setOrderStatusDTO: SetOrderStatusDTO): Promise<void> {
        const { id, newStatus } = setOrderStatusDTO;
    }
}
