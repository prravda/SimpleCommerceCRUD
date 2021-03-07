import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {CreateOrderDTO, CreateProductDTO} from "./orders.dto";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('create')
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.ordersService.createProduct(createProductDTO);
    }
}

@Controller('orders')
export class OrdersController {
    constructor(
       private readonly ordersService: OrdersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('create')
    async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
        return await this.ordersService.createOrder(createOrderDTO);
    }
}