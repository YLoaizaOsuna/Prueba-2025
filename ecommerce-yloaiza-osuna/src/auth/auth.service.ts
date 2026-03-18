import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/roles.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  // }
  // if (FoundUser.isSuperAdmin) {
  //   roles.push(Role.SuperAdmin);
  // }
  // const payload = {
  //   id: FoundUser.id,
  //   name: FoundUser.name,
  //   roles,
  // };
  // const token = this.jwtService.sign(payload);
  //* Ajustar el token ejercicio de isBlocked (paso 8)
  //     const roles: Role[] = [Role.User];
  //     if (FoundUser.isAdmin) {
  //      roles.push(Role.Admin);
  //     }
  //     if (FoundUser.isSuperAdmin) {
  //       roles.push(Role.SuperAdmin);
  //     }
  //     const payload = {
  //       id: FoundUser.id,
  //       name: FoundUser.name,
  //       roles,
  //       isBlocked: FoundUser.isBlocked,
  // };
  //     const token = this.jwtService.sign(payload);
  //* Enviar Token al front
  signUp(user: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'Autenticación';
  }

  //LOGIN
  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException(`Email y password requeridos`);
    }

    //1.Verificar que existe el usuario:
    const FoundUser = await this.usersRepository.getUserByEmail(email);
    if (!FoundUser) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    //2. Comparar contraseñas:

    const validPassword = await bcrypt.compare(password, FoundUser.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email o password incorrectos');
    }
    //* Restringir acceso a usuario bloqueado (isBlocked paso 9)
    if (FoundUser.isBlocked) {
      throw new ForbiddenException('Usuario bloqueado');
    }

    //3. firmar el token:
    const payload = {
      id: FoundUser.id,
      name: FoundUser.name,
      roles: FoundUser.isAdmin ? [Role.Admin] : [Role.User],
    };

    const token = this.jwtService.sign(payload);

    return {
      message: `Usuario logueado (Token)`,
      token: token,
    };

    //* ajustar el token en auth.service(7 paso del superAdmin)
    //     const roles: Role[] = [Role.User];

    // if (FoundUser.isAdmin) {
    //   roles.push(Role.Admin);
    // }

    // if (FoundUser.isSuperAdmin) {
    //   roles.push(Role.SuperAdmin);
    // }

    // const payload = {
    //   id: FoundUser.id,
    //   name: FoundUser.name,
    //   roles,
    // };

    // const token = this.jwtService.sign(payload);

    //* Ajustar el token ejercicio de isBlocked (paso 8)
    //     const roles: Role[] = [Role.User];

    //     if (FoundUser.isAdmin) {
    //      roles.push(Role.Admin);
    //     }

    //     if (FoundUser.isSuperAdmin) {
    //       roles.push(Role.SuperAdmin);
    //     }

    //     const payload = {
    //       id: FoundUser.id,
    //       name: FoundUser.name,
    //       roles,
    //       isBlocked: FoundUser.isBlocked,
    // };

    //     const token = this.jwtService.sign(payload);

    //* Enviar Token al front
    return {
      message: 'Usuario logueado',
      token: token,
    };
  }
}

// //*REGISTRO
// async signUp(user: Partial<Users>) {
//   const { email, password } = user;
//   if (!email || !password) {
//     throw new BadRequestException('Se necesita Email y Password');
//   }
//   //* Verificar que el Email no este registrado:
//   const foundUser = await this.usersRepository.getUserByEmail(email);
//   if (foundUser) {
//     throw new BadRequestException('El email ya está registrado');
//   }
//   //*Hashear contraseña:
//   const hashedPassword = await bcrypt.hash(password, 10);

//   //*Guarduar nuevo Usuario:
//   const { id, ...userWithoutId } = user;
//   await this.usersRepository.addUser({
//     ...userWithoutId,
//     password: hashedPassword,
//     confirmPassword: password,
//     isSuperadmin: false,
//   });
// }
