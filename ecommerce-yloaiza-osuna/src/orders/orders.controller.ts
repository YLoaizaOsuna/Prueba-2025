import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  addOrder(@Body() order: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { userId, products } = order;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
