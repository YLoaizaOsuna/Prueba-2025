import { Injectable } from '@nestjs/common';

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

const users: User[] = [
  {
    id: '1',
    email: 'adele@mail.com',
    name: 'Adele',
    password: 'Adele@2025',
    address: '221B Baker Street',
    phone: '+44 7123 456789',
    country: 'United Kingdom',
    city: 'London',
  },
  {
    id: '2',
    email: 'brunomars@mail.com',
    name: 'Bruno Mars',
    password: 'Bruno123!',
    address: 'Sunset Blvd 320',
    phone: '+1 213 555 3412',
    country: 'USA',
    city: 'Los Angeles',
  },
  {
    id: '3',
    email: 'shakira@mail.com',
    name: 'Shakira',
    password: 'Shakira#Col2025',
    address: 'Cra 45 #22-18',
    phone: '+57 310 234 5678',
    country: 'Colombia',
    city: 'Barranquilla',
  },
  {
    id: '4',
    email: 'edsheeran@mail.com',
    name: 'Ed Sheeran',
    password: 'ShapeOfYou!9',
    address: '5 High Street',
    phone: '+44 7890 654321',
    country: 'United Kingdom',
    city: 'Halifax',
  },
  {
    id: '5',
    email: 'beyonce@mail.com',
    name: 'Beyoncé',
    password: 'QueenB#2025',
    address: 'Parkwood Avenue 101',
    phone: '+1 713 555 9087',
    country: 'USA',
    city: 'Houston',
  },
  {
    id: '6',
    email: 'luisfonsi@mail.com',
    name: 'Luis Fonsi',
    password: 'Despacito!7',
    address: 'Calle 12 #45-67',
    phone: '+1 787 555 6712',
    country: 'Puerto Rico',
    city: 'San Juan',
  },
  {
    id: '7',
    email: 'ladygaga@mail.com',
    name: 'Lady Gaga',
    password: 'Gaga@2025',
    address: 'Broadway 204',
    phone: '+1 917 555 3456',
    country: 'USA',
    city: 'New York',
  },
  {
    id: '8',
    email: 'maluma@mail.com',
    name: 'Maluma',
    password: 'PrettyBoy#10',
    address: 'Calle 94 #23-45',
    phone: '+57 320 567 1234',
    country: 'Colombia',
    city: 'Medellín',
  },
  {
    id: '9',
    email: 'rihanna@mail.com',
    name: 'Rihanna',
    password: 'Fenty2025!',
    address: 'Ocean Drive 88',
    phone: '+1 246 555 7789',
    country: 'Barbados',
    city: 'Saint Michael',
  },
  {
    id: '10',
    email: 'theweeknd@mail.com',
    name: 'The Weeknd',
    password: 'Starboy@88',
    address: 'Toronto Central 55',
    phone: '+1 416 555 9876',
    country: 'Canada',
    city: 'Toronto',
  },
];

@Injectable()
export class UsersRepository {
  async getUsers() {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return await users;
  }
}
