import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'bart@gmail.com',
      name: 'Bart',
      password: 'Bart123*',
      adress: 'evergreen75',
      phone: '3112258478',
      country: 'USA',
      city: 'Springfield',
    },
    {
      id: 2,
      email: 'marge@gmail.com',
      name: 'Marge',
      password: 'Marge123*',
      adress: 'evergreen75',
      phone: '3112258479',
      country: 'USA',
      city: 'Springfield',
    },
    {
      id: 3,
      email: 'homer@gmail.com',
      name: 'Homer',
      password: 'Homer123*',
      adress: 'evergreen75',
      phone: '3112258480',
      country: 'USA',
      city: 'Springfield',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/require-await
  async getUsers() {
    return this.users;
  }
}
