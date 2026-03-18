/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({
    summary: 'Endpoint de prueba de Auth',
    description:
      'Solo retorna un mensaje o información básica del modúlo de autenticación',
  })
  @ApiOkResponse({
    description: 'Módulo de Auth operativo',
  })
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión (login)' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description:
      'Credenciales válidas. Devuelve el token JWT y/o información del usuario',
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas (email o password incorrectos)',
  })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Usuario registrado correctamente',
  })
  @ApiBadRequestResponse({
    description:
      'Datos invalidos o passwords que no coinciden / no cumple las reglas',
  })
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
