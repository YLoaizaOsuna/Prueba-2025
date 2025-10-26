import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]> {
    return this.usersRepository.getUsers(page, limit);
  }

  getUser(id: string): Promise<Omit<Users, 'password'>> {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: Users): Promise<Omit<Users, 'password'>> {
    return this.usersRepository.addUser(user);
  }

  updateUser(
    id: string,
    userNewData: Partial<Users>,
  ): Promise<Omit<Users, 'password'>> {
    if (!id) throw new Error('ID es requerido');
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string): Promise<Omit<Users, 'password'>> {
    return this.usersRepository.deleteUser(id);
  }
}
