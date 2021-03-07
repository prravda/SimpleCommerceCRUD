import {SetOrderStatusDTO, CreateOrderDTO, CreateOrderStatusDTO, CreateProductDTO} from "./orders.dto";
import {Order} from "./entities/orders.entity";
import {OrderStatus} from "./entities/orderStatus.entity";
import {Product} from "./entities/products.entity";
import {OrdersRepository} from "./orders.repository";

export class OrdersService {
    private ordersRepository: OrdersRepository;
    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository;
    }

    async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
        try {
            return await this.ordersRepository.createOrder(createOrderDTO);
        } catch (e) {
            throw new Error('CreateOrderError: check parameter again');
        }
    }
    async createOrderStatus(createOrderStatusDTO: CreateOrderStatusDTO): Promise<OrderStatus> {
        try {
            return await this.ordersRepository.createOrderStatus(createOrderStatusDTO);
        } catch (e) {
            throw new Error('CreateOrderError: check parameter again');
        }
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        try {
            return await this.ordersRepository.createProduct(createProductDTO);
        } catch (e) {
            throw new Error('CreateOrderError: check parameter again');
        }
    }

    async setOrderStatus(setOrderStatusDTO: SetOrderStatusDTO): Promise<void> {
        try {
            await this.ordersRepository.setOrderStatus(setOrderStatusDTO);
        } catch (e) {
            throw new Error('CreateOrderError: check parameter again');
        }
    }
}
