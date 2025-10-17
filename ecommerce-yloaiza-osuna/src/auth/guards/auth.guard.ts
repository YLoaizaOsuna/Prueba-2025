/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validate(request: Request) {
  //console.log(request.headers);
  //* Bearer Ariel@mail:1234

  const authHeader = request.headers['authorization'];
  //* Bearer Ariel@mail:1234
  if (!authHeader) return false;

  const auth = authHeader.split(' ')[1];
  //* [ariel@mail:1234]

  const [email, password] = auth.split(':');
  if (!email || !password) return false;

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return validate(request);
  }
}
