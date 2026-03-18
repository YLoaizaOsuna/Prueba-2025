import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  //* Filtrar por pais (2 paso)
  // getUsers(
  //   page: number,
  //   limit: number,
  //   country: string,
  // ): Promise<Omit<Users, 'password'>[]> {
  //   return this.usersRepository.getUsers(page, limit, country);
  // }

  //* Ordenar ASC por ID (2 paso)
  // getUsers(
  //   page: number,
  //   limit: number,
  //   order: 'ASC' | 'DESC' = 'ASC",
  // ): Promise<Omit<Users, 'password'>[]> {
  //   return this.usersRepository.getUsers(page, limit, order);
  // }

  getUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]> {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(dto: CreateUserDto) {
    return this.usersRepository.addUser(dto);
  }

  updateUser(
    id: string,
    userNewData: Partial<Users>,
  ): Promise<Omit<Users, 'password'>> {
    if (!id) throw new Error('ID es requerido');
    return this.usersRepository.updateUser(id, userNewData);
  }

  //* Nuevo metodo (isBlocked 5 paso)
  blockUser(id: string, isBlocked: boolean) {
    return this.usersRepository.blockUser(id, isBlocked);
  }

  deleteUser(id: string): Promise<Omit<Users, 'password'>> {
    return this.usersRepository.deleteUser(id);
  }

  //* 3 paso del borrado logico
  // deleteUser(id: string) {
  //   return this.usersRepository.deleteUser(id);
  // }
}
