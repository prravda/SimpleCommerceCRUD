import {AbstractOrdersRepository} from "./orders.abstract.repository";
import {SetOrderStatusDTO, CreateOrderDTO, CreateOrderStatusDTO, CreateProductDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";
import {OrderStatus} from "./entities/orderStatus.entity";
import {Product} from "./entities/products.entity";

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

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const { name, price, currency, url, contact } = createProductDTO;
        return await Product.create({
            name: name,
            price: price,
            currency: currency,
            url: url,
            contact: contact,
        });
    }

    async setOrderStatus(setOrderStatusDTO: SetOrderStatusDTO): Promise<void> {
        const { id, newStatus } = setOrderStatusDTO;
    }
}
