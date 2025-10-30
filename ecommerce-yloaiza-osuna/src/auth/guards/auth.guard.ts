import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment.dev';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    //* 'Bearer TOKEN'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Se requiere Token');
    }

    try {
      const secret = environment.JWT_SECRET;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const payload = this.jwtService.verify(token, { secret });
      //*payload = {id, name, exp}

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.exp = new Date(payload.exp * 1000);

      console.log('Payload: ', payload);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      request.user = payload;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('Request.user: ', request.user);

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Error al validar Token');
    }
  }
}
