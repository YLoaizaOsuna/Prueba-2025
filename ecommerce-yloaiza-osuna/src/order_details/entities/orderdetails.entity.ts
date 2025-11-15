import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERDETAILS' })
export class OrderDetails {
  @ApiProperty({
    description:
      'UUID v4 del detalle de la orden generado por la base de datos',
    example: '5f3a4a7e-4d2b-4f8e-9c41-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'Precio total del detalle (puede ser subtotal de los productos)',
    example: 149990.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Orden a la que pertenece este detalle',
    type: () => Orders,
  })
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ApiProperty({
    description: 'Productos incluidos en este detalle de orden',
    type: () => Products,
    isArray: true,
  })
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'orderdetail_id', referencedColumnName: 'id' },
  })
  products: Products[];
}
