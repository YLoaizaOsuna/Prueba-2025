import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from 'src/products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'CATEGORIES' })
export class Categories {
  @ApiProperty({
    description: 'UUID v4 de la categoría generado por la base de datos',
    example: '5f3a4a7e-4d2b-4f8e-9c41-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'smartphone',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    description: 'Productos que pertenecen a esta categoria',
    type: () => Products,
    isArray: true,
    required: false,
  })
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
