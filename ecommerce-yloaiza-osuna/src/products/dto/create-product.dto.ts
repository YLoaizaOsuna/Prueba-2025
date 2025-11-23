import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumber,
  IsPositive,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre único del producto',
    example: 'Acer Predator Helios 300',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no debe superar 50 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Portátil gamer con RTX 4060, 16GB RAM...',
  })
  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({
    description: 'Precio con máximo 2 decimales',
    example: 1500.5,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con máximo 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser mayor que 0' })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 12,
  })
  @IsNumber({}, { message: 'El stock debe ser numérico' })
  @IsPositive({ message: 'El stock debe ser mayor que 0' })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://via.placeholder.com/300x200?text=Product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La URL de imagen debe ser texto' })
  imgUrl?: string;

  @ApiProperty({
    description: 'Id de la categoría a la que pertenece el producto',
    example: 'e289ea12-f353-458b-9c89-002dce9d30c7',
  })
  @IsUUID('4', { message: 'El id de categoría debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  categoryId: string;
}
