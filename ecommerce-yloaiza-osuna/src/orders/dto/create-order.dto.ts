import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id del usuario que crea la orden',
    example: '0d5b4b0a-5d4b-4d3c-9f12-3b25c76a1234',
  })
  @IsNotEmpty({ message: 'La Id es requerido' })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos que componen la orden',
  })
  @IsArray({ message: 'Products debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos 1 producto' })
  products: Partial<Products[]>;
}
