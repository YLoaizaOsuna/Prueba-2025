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

  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT);
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
}
void bootstrap();
