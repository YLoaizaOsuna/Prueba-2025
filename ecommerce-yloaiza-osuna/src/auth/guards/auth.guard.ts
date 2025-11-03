import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment.dev';
import { Role } from '../enums/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //*extraer request desde context

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest(); //*extraer autorizacion desde request

    //* 'Bearer TOKEN'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No se ha enviado un token');
    } //* Separar =>  authHeader = 'Bearer TOKEN'

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('No se ha enviado un token');
    }
    //Validar Token
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const payload = this.jwtService.verify(token, {
        secret: environment.JWT_SECRET,
      }); //*payload = {id, name, exp}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];

      //* Adjuntar "payload" al "request":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      request.user = payload;
      return true;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado');
      }
      throw new UnauthorizedException('Error al validar el token');
    }
  }
}
