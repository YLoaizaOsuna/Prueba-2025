import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Autenticación';
  }

  //*LOGIN
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
  //*REGISTRO
  async signUp(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password) {
      throw new BadRequestException('Se necesita Email y Password');
    }
    //* Verificar que el Email no este registrado:
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException('El email ya está registrado');
    }
    //*Hashear contraseña:
    const hashedPassword = await bcrypt.hash(password, 10);

    //*Guarduar nuevo Usuario:
    await this.usersRepository.addUser({ ...user, password: hashedPassword });
  }
}
