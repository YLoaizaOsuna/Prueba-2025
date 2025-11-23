import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Users } from './entities/users.entity';

describe('UsersService (unit)', () => {
  let service: UsersService;
  let repo: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    // Creamos un mock del UsersRepository
    const mockUsersRepository: Partial<jest.Mocked<UsersRepository>> = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      addUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      getUserByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(UsersRepository) as jest.Mocked<UsersRepository>;
  });

  // 1) getUsers
  it('debería obtener la lista de usuarios (getUsers)', async () => {
    const fakeUsers: Omit<Users, 'password'>[] = [
      { id: '1', email: 'user1@test.com' } as any,
      { id: '2', email: 'user2@test.com' } as any,
    ];

    repo.getUsers.mockResolvedValue(fakeUsers);

    const result = await service.getUsers(1, 10);

    expect(repo.getUsers).toHaveBeenCalledWith(1, 10);
    expect(result).toHaveLength(2);
    expect(result[0].email).toBe('user1@test.com');
  });

  // 2) getUser
  it('debería obtener un usuario por id (getUser)', async () => {
    const fakeUser: Omit<Users, 'password'> = {
      id: 'abc',
      email: 'user@test.com',
    } as any;

    repo.getUserById.mockResolvedValue(fakeUser);

    const result = await service.getUser('abc');

    expect(repo.getUserById).toHaveBeenCalledWith('abc');
    expect(result.id).toBe('abc');
    expect(result.email).toBe('user@test.com');
  });

  // 3) addUser
  it('debería agregar un usuario (addUser) llamando al repositorio', async () => {
    const userPartial: Partial<Users> = {
      name: 'Yesid',
      email: 'yesid@test.com',
    };

    const returnedUser: Omit<Users, 'password'> = {
      id: '1',
      name: 'Yesid',
      email: 'yesid@test.com',
    } as any;

    repo.addUser.mockResolvedValue(returnedUser);

    const result = await service.addUser(userPartial);

    expect(repo.addUser).toHaveBeenCalledWith(userPartial);
    expect(result).toEqual(returnedUser);
  });

  // 4) updateUser correcto
  it('debería actualizar un usuario cuando se envía un id válido (updateUser)', async () => {
    const updated: Omit<Users, 'password'> = {
      id: '1',
      name: 'Nuevo nombre',
      email: 'user@test.com',
    } as any;

    repo.updateUser.mockResolvedValue(updated);

    const result = await service.updateUser('1', { name: 'Nuevo nombre' });

    expect(repo.updateUser).toHaveBeenCalledWith('1', { name: 'Nuevo nombre' });
    expect(result).toEqual(updated);
  });

  // 5) updateUser sin id (caso de error)
  it('debería lanzar error si updateUser se llama sin id', () => {
    expect(() =>
      service.updateUser('', { name: 'Nuevo nombre' } as any),
    ).toThrow('ID es requerido');
  });

  // 6) deleteUser
  it('debería eliminar un usuario (deleteUser) llamando al repositorio', async () => {
    const deleted: Omit<Users, 'password'> = {
      id: '1',
      email: 'delete@test.com',
    } as any;

    repo.deleteUser.mockResolvedValue(deleted);

    const result = await service.deleteUser('1');

    expect(repo.deleteUser).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleted);
  });
});
