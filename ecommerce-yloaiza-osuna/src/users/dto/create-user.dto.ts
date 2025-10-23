import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Orders } from 'src/orders/entities/orders.entity';

export class CreateUserDto {
  id: string;
  orders: Orders[];

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre no debe superar 80 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El password es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(8, { message: 'El nombre debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'El nombre debe tener máximo 15 caracteres' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Debe tener al menos una misnúscula, una mayúscula, un número y un caracter especial: !@#$%^&*',
    },
  )
  password: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre debe tener máximo 80 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsInt({ message: 'El telefono debe ser un numero entero' })
  phone: number;

  @IsString({ message: 'El pais debe ser texto' })
  @MinLength(5, {
    message: 'El nombre del pais debe tener al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre del país debe tener máximo 20 caracteres',
  })
  country: string;

  @IsString({ message: 'La ciudad debe ser texto' })
  @MinLength(5, {
    message: 'El nombre de la ciudad debe tener al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre de la ciudad debe tener máximo 20 caracteres',
  })
  city: string;
}
