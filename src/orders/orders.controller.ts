import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {CreateOrderDTO, CreateProductDTO} from "./orders.dto";

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