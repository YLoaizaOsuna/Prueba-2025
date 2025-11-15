import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../order_details/entities/orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @ApiProperty({
    description: 'UUID v4 generado por la base de datos',
    example: 'a3e16b76-0d0f-4f4f-8f61-f9b3f82c9876',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre único del producto',
    example: 'Acer Predator',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example:
      'Portátil Acer Predator Helios Neo16s Ultra9 275HX 32GB 1TB RTX 5060 8GB Pantalla 16" Oled 240Hz',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Precio del producto con 2 decimales',
    example: 150.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponble en inventario',
    example: 12,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://via.placeholder.com/300x200?text=Product',
  })
  @Column({
    type: 'text',
    default: 'https://via.placeholder.com/300x200?text=Product',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Categoria a la que pertenece el producto',
    type: () => Categories,
  })
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ApiProperty({
    description: 'Detalles de ordenes donde aparece este producto',
    type: () => OrderDetails,
    isArray: true,
  })
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
