import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    if (!products) return 'Productos son requeridos';
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
