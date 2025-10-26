import { environment } from './environment.dev';
import { registerAs } from '@nestjs/config';

const config = {
  type: 'postgres',
  database: environment.DB_NAME,
  host: environment.DB_HOST || 'localhost',
  port: Number(environment.DB_PORT) || 5432,
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoloadEntities: true,
  logging: false,
  synchronize: true,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
