import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from '../../order_details/entities/orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERS' })
export class Orders {
  @ApiProperty({
    description: 'uuid v4 generada por la base de datos',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha con formato dd/mm/yyyy',
    example: '10/11/2025',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
