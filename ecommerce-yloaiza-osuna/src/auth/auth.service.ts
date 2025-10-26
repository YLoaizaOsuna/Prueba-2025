import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Autenticación';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException(`Email y password requeridos`);
    }
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException(`Email o password incorrectos`);
    }
    return `Usuario logueado (Token)`;
  }
}
