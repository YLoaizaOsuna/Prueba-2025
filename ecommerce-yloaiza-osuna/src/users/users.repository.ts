import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async addUser(user: Partial<Users>): Promise<Omit<Users, 'password'>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({
      id: newUser.id,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userNoPassword } = dbUser!;
    return userNoPassword;
  }

  async updateUser(
    id: string,
    data: Partial<Users>,
  ): Promise<Omit<Users, 'password'>> {
    await this.usersRepository.update(id, data);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }
    const { password, ...userNoPassword } = updateUser;
    void password;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }
    void this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    void password;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    const foundUser = await this.usersRepository.findOneBy({ email });
    return foundUser;
  }
}
