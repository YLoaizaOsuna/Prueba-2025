import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs'; //* (quitar el password con interceptor paso 1)

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item: unknown) => {
            if (item && typeof item === 'object') {
              const { password, ...userWithoutPassword } = item as Record<
                string,
                unknown
              >;
              return userWithoutPassword;
            }
            return item;
          });
        }

        if (data && typeof data === 'object') {
          const { password, ...userWithoutPassword } = data as Record<
            string,
            unknown
          >;
          return userWithoutPassword;
        }

        return data;
      }),
    );
  }
}
