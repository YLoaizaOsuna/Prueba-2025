import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import { AuthGuard } from '../src/auth/guards/auth.guard';
import { RolesGuard } from '../src/auth/guards/roles.guard';
import { CategoriesService } from '../src/categories/categories.service';
import { ProductsService } from '../src/products/products.service';
import { UsersService } from '../src/users/users.service';

// Mock de AuthGuard: siempre deja pasar
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}
class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthRequest>();
    // opcional: simular un usuario
    req.user = {
      id: 'test-user-id',
      email: 'test@example.com',
      roles: ['Admin'],
    };
    return true;
  }
}

// Mock de RolesGuard: siempre deja pasar
class MockRolesGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('App e2e (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      // Mockear CategoriesService para que no haga seeding real
      .overrideProvider(CategoriesService)
      .useValue({
        addCategories: jest.fn().mockResolvedValue('ok'),
      })
      // Mockear ProductsService para que no toque la BD
      .overrideProvider(ProductsService)
      .useValue({
        getProducts: jest.fn().mockResolvedValue([]),
        addProducts: jest.fn().mockResolvedValue('ok'),
      })
      //  Mockear UsersService para controlar /users y /users/:id
      .overrideProvider(UsersService)
      .useValue({
        // GET /users → queremos 200 y array
        getUsers: jest.fn().mockResolvedValue([]),
        // GET /users/:id → queremos 404 si no existe
        getUser: jest
          .fn()
          .mockRejectedValue(new NotFoundException('Usuario no encontrado')),

        addUser: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 1) GET /
  it('GET / debería devolver "Hello World!"', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // 2) GET /products
  it('GET /products debería devolver 200 y un array', async () => {
    const res = await request(app.getHttpServer()).get('/products');

    expect(res.status).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3) GET /products/seeder
  it('GET /products/seeder debería devolver 200', async () => {
    const res = await request(app.getHttpServer()).get('/products/seeder');

    expect(res.status).toBe(200);
    // seeder devuelve un string tipo "Productos agregados"

    expect(res.text || res.body).toBeDefined();
  });

  // 4) GET /users
  it('GET /users debería devolver 200 y un array', async () => {
    const res = await request(app.getHttpServer()).get('/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 5) GET /users/:id con un id que NO existe
  it('GET /users/:id debería devolver 404 si el usuario no existe', async () => {
    const fakeId = '00000000-0000-0000-0000-000000000000';

    const res = await request(app.getHttpServer()).get(`/users/${fakeId}`);

    // UsersRepository, lanza NotFoundException
    // que Nest traduce a 404
    expect(res.status).toBe(404);
  });
});
