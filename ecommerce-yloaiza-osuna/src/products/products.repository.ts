import { Injectable } from '@nestjs/common';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Guitarra Eléctrica Fender Stratocaster',
    description:
      'Guitarra eléctrica de cuerpo sólido con un tono clásico y versátil, ideal para rock y blues.',
    price: 1200,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/19/14/00/electric-guitar-1830156_1280.jpg',
  },
  {
    id: 2,
    name: 'Piano Digital Yamaha P-125',
    description:
      'Piano digital de 88 teclas con acción de martillo y sonido realista de piano acústico.',
    price: 950,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/29/03/53/piano-1867122_1280.jpg',
  },
  {
    id: 3,
    name: 'Batería Acústica Pearl Export Series',
    description:
      'Set completo de batería acústica con excelente resonancia y durabilidad.',
    price: 1450,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/02/02/11/44/drums-2031142_1280.jpg',
  },
  {
    id: 4,
    name: 'Violín 4/4 Stradivari Replica',
    description:
      'Violín artesanal con excelente proyección y sonido cálido, ideal para estudiantes avanzados.',
    price: 780,
    stock: false,
    imgUrl:
      'https://cdn.pixabay.com/photo/2014/08/05/10/31/violin-410449_1280.jpg',
  },
  {
    id: 5,
    name: 'Saxofón Alto Yamaha YAS-280',
    description:
      'Saxofón de latón con afinación precisa, sonido brillante y gran comodidad para principiantes.',
    price: 1100,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2015/09/05/19/27/saxophone-925766_1280.jpg',
  },
  {
    id: 6,
    name: 'Bajo Eléctrico Ibanez GSR200',
    description:
      'Bajo de 4 cuerdas con cuerpo ergonómico y un tono profundo, ideal para funk y rock.',
    price: 530,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/21/12/59/bass-guitar-1841187_1280.jpg',
  },
  {
    id: 7,
    name: 'Flauta Traversa Gemeinhardt 2SP',
    description:
      'Flauta de nivel intermedio con cuerpo de plata niquelada y tono brillante.',
    price: 460,
    stock: false,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/03/27/21/16/flute-1285089_1280.jpg',
  },
  {
    id: 8,
    name: 'Teclado MIDI Akai MPK Mini MK3',
    description:
      'Controlador MIDI compacto con pads, perillas asignables y 25 teclas sensibles a la velocidad.',
    price: 150,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/01/10/21/08/music-1967486_1280.jpg',
  },
  {
    id: 9,
    name: 'Trompeta Bach Stradivarius 180S37',
    description:
      'Trompeta profesional con una respuesta rápida y un timbre potente y equilibrado.',
    price: 2100,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/19/14/02/trumpet-1830173_1280.jpg',
  },
  {
    id: 10,
    name: 'Ukulele Kala KA-15S',
    description:
      'Ukulele soprano de caoba con sonido cálido y construcción resistente, ideal para principiantes.',
    price: 120,
    stock: true,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/23/18/12/ukulele-1858416_1280.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getProducts() {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return await products;
  }
}
