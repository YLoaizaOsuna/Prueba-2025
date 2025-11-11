import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { Orders } from 'src/orders/entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orders: Orders[];

  /**
   * Debe ser un string entre 3-80 caracteres
   * @example 'Test User01'
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre no debe superar 80 caracteres' })
  name: string;

  /**
   * Debe ser un email valido
   * @example 'testuser01@gmail.com'
   */
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  /**
   * Debe contener 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial
   * @example 'aaBB##333'
   */
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

  /**
   * Debe ser igual al password
   * @example 'aaBB##333'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'Demo street 1234'
   */
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre debe tener máximo 80 caracteres' })
  address: string;

  /**
   * Debe ser un número
   * @example '123456789'
   */
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsInt({ message: 'El telefono debe ser un numero entero' })
  phone: number;

  /**
   * Debe ser un string entre 5 y 20 caracteres
   * @example 'Demo Country'
   */
  @IsString({ message: 'El pais debe ser texto' })
  @MinLength(5, {
    message: 'El nombre del pais debe tener al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre del país debe tener máximo 20 caracteres',
  })
  country: string;

  /**
   * Debe ser un string entre 5 y 20 caracteres
   * @example 'Demo City'
   */
  @IsString({ message: 'La ciudad debe ser texto' })
  @MinLength(5, {
    message: 'El nombre de la ciudad debe tener al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre de la ciudad debe tener máximo 20 caracteres',
  })
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}
