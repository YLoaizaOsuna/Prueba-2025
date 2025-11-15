import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from 'src/orders/entities/orders.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'USERS' })
export class Users {
  @ApiProperty({
    description: 'UUID v4 del usuario generado por la base de datos',
    example: 'a3e16b76-0d0f-4f4f-8f61-f9b3f82c9876',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Yesid Loaiza',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'yesid@example.com',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  //No queremos que aparezca en la doc
  @ApiHideProperty()
  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: 3001234567,
  })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({
    description: 'País del usuario',
    example: 'Colombia',
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20 })
  country: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle 123 #45-67',
  })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({
    description: 'Ciudad del usuario',
    example: 'Bogotá',
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20 })
  city: string;

  //campo interno no queremos mostrarlo en la doc
  @ApiHideProperty()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @ApiProperty({
    description: 'Ordenes asociadas al usuario',
    type: () => Orders,
    isArray: true,
    required: false,
  })
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
