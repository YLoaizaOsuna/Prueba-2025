import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'La Id es requerido' })
  @IsUUID()
  userId: string;

  @IsArray({ message: 'Products debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos 1 producto' })
  products: Partial<Products[]>;
}
