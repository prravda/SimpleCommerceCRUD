import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateOrderDTO} from "./orders.dto";
import {AuthService} from "../auth/auth.service";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly authService: AuthService,
        private readonly ordersService: OrdersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrdersByUserID(@Request() req) {
        console.log(req.user);
        return await this.ordersService.getOrdersByUserID(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
        return await this.ordersService.createOrder(createOrderDTO);
    }
}