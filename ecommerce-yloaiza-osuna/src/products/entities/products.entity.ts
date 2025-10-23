import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from 'src/categories/entities/categories.entity';
import { OrderDetails } from 'src/order_details/entities/orderdetails.entity';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'text',
    default: 'https://via.placeholder.com/300x200?text=Product',
  })
  imgUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails: OrderDetails[];
}
