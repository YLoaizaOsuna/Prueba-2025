import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
