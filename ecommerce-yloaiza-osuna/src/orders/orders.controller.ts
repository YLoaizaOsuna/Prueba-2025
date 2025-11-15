import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Orders } from './entities/orders.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    description: 'Productos son requeridos o datos inváalidos0',
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado/token inválido',
  })
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    if (!products) return 'Productos son requeridos';
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obtener una orden por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la orden',
    example: 'a3e16b76-0d0f-4f4f-8f61-f9b3f82c9876',
  })
  @ApiOkResponse({
    description: 'Orden encontrada',
    type: Orders,
  })
  @ApiNotFoundResponse({
    description: 'Orden no encontrada',
  })
  @ApiUnauthorizedResponse({ description: 'No autenticada/ token inválido' })
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
