import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Description 1',
      price: 1300,
      stock: true,
      imgUrl: 'https://www.asus.com/media/Odin/Websites/global/Series/24.png',
    },
    {
      id: 1,
      name: 'tablet',
      description: 'Description 2',
      price: 700,
      stock: true,
      imgUrl:
        'https://http2.mlstatic.com/D_NQ_NP_726613-MLU77751138403_072024-O.webp',
    },
    {
      id: 3,
      name: 'printer',
      description: 'Description 3',
      price: 500,
      stock: true,
      imgUrl:
        'https://compubit.com.co/wp-content/uploads/2024/04/mas-productos-web-2024-40.jpg',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getProduct() {
    return this.products;
  }
}
