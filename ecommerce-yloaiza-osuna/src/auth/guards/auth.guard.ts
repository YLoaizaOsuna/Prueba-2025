import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles.enum';
import { environment } from './../../config/environment.dev';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //*extraer request desde context

    const request = context.switchToHttp().getRequest(); //*extraer autorizacion desde request

    //* 'Bearer TOKEN'

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No se ha enviado un token');
    } //* Separar =>  authHeader = 'Bearer TOKEN'

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('No se ha enviado un token');
    }
    //Validar Token
    try {
      const payload = this.jwtService.verify(token, {
        secret: environment.JWT_SECRET,
      }); //*payload = {id, name, exp}
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];

      //* Adjuntar "payload" al "request":
      request.user = payload;
      return true;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado');
      }
      throw new UnauthorizedException('Error al validar el token');
    }
  }
}
