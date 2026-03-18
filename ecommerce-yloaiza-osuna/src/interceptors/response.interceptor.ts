import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
//* Crear interceptor (estandarizar respuestas paso 1)
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        status: response.statusCode,
        message: 'Operación exitosa',
        response: data,
        error: null,
        timestamp: new Date(),
      })),
    );
  }
}
