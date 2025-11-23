import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  //* 1. Acceder a la Metadata
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* 1. Bis
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    //* 2. Acceder a request.user = ['admin'] || ['user']
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //* Validacion requiredRoles vs user
    //*             ['admin', 'superadmin', etc]  vs ['user', 'admin', etc]

    const hasRole = () =>
      requiredRoles.some((role) => user?.roles?.includes(role));
    const valid = user && user.roles && hasRole();
    if (!valid) {
      throw new UnauthorizedException('No tiene permisos');
    }
    return true;
  }
}
