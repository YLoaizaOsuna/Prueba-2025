import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    if (!products) return 'Productos son requeridos';
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
