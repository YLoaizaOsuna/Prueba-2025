import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUser(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, userNewData: any) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
