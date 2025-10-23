import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Products } from 'src/products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: Partial<Products[]>) {
    return this.ordersRepository.addOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
