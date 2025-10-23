import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre debe tener al menos 80 caracteres' })
  name: string;
}
//otras propiedades
