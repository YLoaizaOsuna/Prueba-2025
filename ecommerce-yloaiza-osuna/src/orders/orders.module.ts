import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from 'src/orders/entities/orders.entity';
import { OrderDetails } from 'src/order_details/entities/orderdetails.entity';
import { Users } from 'src/users/entities/users.entity';
import { Products } from 'src/products/entities/products.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
