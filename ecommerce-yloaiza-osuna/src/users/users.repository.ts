import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly ormUsersRepository: Repository<Users>,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      skip: skip,
      take: limit,
    });
    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }
  //* ajuste del getUsers en interceptor no password
  // async getUsers(page: number, limit: number): Promise<Users[]> {
  //   const skip = (page - 1) * limit;
  //   return await this.ormUsersRepository.find({
  //     skip,
  //     take: limit,
  //   });
  // }

  //*Ajuste del getUsers (6 paso creacion de superAdmin)
  // async getUsers(
  //   page: number,
  //   limit: number,
  // ): Promise<Omit<Users, 'password' | 'isAdmin' | 'isSuperAdmin'>[]> {
  //   const skip = (page - 1) * limit;
  //   const allUsers = await this.ormUsersRepository.find({
  //     skip: skip,
  //     take: limit,
  //   });
  //   return allUsers.map(
  //     ({ password, isAdmin, isSuperAdmin, ...userNoPassword }) =>
  //       userNoPassword,
  //   );
  // }

  //* Filtrar por pais (3 paso)
  // async getUsers(
  //   page: number,
  //   limit: number,
  //   country?: string,
  // ): Promise<Omit<Users, 'password'>[]> {
  //   const skip = (page - 1) * limit;
  //   const where = country ? { country } : {};
  //   const allusers = await this.usersRepository.find({
  //     where,
  //     take: limit,
  //     skip: skip,
  //   });

  //   return allusers.map(({ password, ...userNoPassword }) => userNoPassword);
  // }

  //* Ordenamientos por Id (3 paso)
  // async getUsers(
  //   page: number,
  //   limit: number,
  //   order: 'ASC' | 'DESC',
  // ): Promise<Omit<Users, 'password'>[]> {
  //   const skip = (page - 1) * limit;
  //   const allUsers = await this.ormUsersRepository.find({
  //     skip: skip,
  //     take: limit,
  //     order: {
  //       id: order,
  //     },
  //   });
  //   return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  // }

  //*Borrado Logico (2. paso Modifico el metodo GET)
  // async getUsers(
  //   page: number,
  //   limit: number,
  // ): Promise<Omit<Users, 'password'>[]> {
  //   const skip = (page - 1) * limit;
  //   const allusers = await this.ormUsersRepository.find({
  //     where: { isActive: true },
  //     take: limit,
  //     skip: skip,
  //   });

  //   return allusers.map(({ password, ...userNoPassword }) => userNoPassword);
  // }
  //* Ajuste del getUserById (creacion del superadmin, 5 paso)
  async getUserById(
    id: string,
  ): Promise<Omit<Users, 'password' | 'isAdmin' | 'isSuperAdmin'>> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetails: {
            products: true,
          },
        },
      },
    });
    if (!foundUser)
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);

    const { password, isAdmin, isSuperAdmin, ...filteredUser } = foundUser;
    return filteredUser;
  }

  async addUser(dto: CreateUserDto): Promise<string> {
    const savedUser = await this.ormUsersRepository.save(dto);
    return savedUser.id;
  }

  //* Ajuste del addUser (creacion de superadmin, 4 paso)

  // async addUser(dto: CreateUserDto): Promise<string> {
  //   const newUser = this.ormUsersRepository.create({
  //     ...dto,
  //     isSuperadmin: false,
  //   });
  //   const savedUser = await this.ormUsersRepository.save(newUser);
  //   return savedUser.id;
  // }

  async updateUser(
    id: string,
    data: Partial<Users>,
  ): Promise<Omit<Users, 'password'>> {
    await this.ormUsersRepository.update(id, data);
    const updateUser = await this.ormUsersRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }
    const { password, ...userNoPassword } = updateUser;
    void password;
    return userNoPassword;
  }
  //* Hacer el metodo en usersRepository (paso 6)
  async blockUser(
    id: string,
    isBlocked: boolean,
  ): Promise<Omit<Users, 'password'>> {
    const foundUser = await this.ormUsersRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }
    foundUser.isBlocked = isBlocked;

    const savedUser = await this.ormUsersRepository.save(foundUser);
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.ormUsersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }
    void this.ormUsersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    void password;
    return userNoPassword;
  }
  //* 3 paso del borrado logico
  // async deleteUser(id: string) {
  //   const foundUser = await this.ormUsersRepository.findOneBy({ id });

  //   if (!foundUser) {
  //     throw new NotFoundException(`No existe usuario con id ${id}`);
  //   }

  //   foundUser.isActive = false;
  //   await this.ormUsersRepository.save(foundUser);

  //   return foundUser.id;
  // }

  async getUserByEmail(email: string): Promise<Users | null> {
    const foundUser = await this.ormUsersRepository.findOneBy({ email });
    return foundUser;
  }
}
