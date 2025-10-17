import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  signIn(@Body() credentials: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
