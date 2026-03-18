import { environment } from './config/environment.dev';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce_yloaiza_osuna')
    .setDescription('Proyecto creado con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT de acceso',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, documentFactory);

  //* Interceptor (estandarizar respuestas paso 2
  // app.useGlobalInterceptors(new ResponseInterceptor());
  //* Manejo de errores filters
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(environment.PORT);
  console.log(
    `Servidor escuchando en http://${environment.HOST}:${environment.PORT}`,
  );
}
void bootstrap();
