import { environment } from './config/environment.dev';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(environment.PORT);
  console.log(
    `Servidor escuchando en http://${environment.HOST}:${environment.PORT}`,
  );
}
void bootstrap();
