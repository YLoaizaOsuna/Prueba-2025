import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'Autenticación';
  }

  //*LOGIN
  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException(`Email y password requeridos`);
    }

    //*1.Verificar que existe el usuario:
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    //* 2. Comparar contraseñas:

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    //* 3. firmar el token:
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: `Usuario logueado (Token)`,
      token: token,
    };
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
