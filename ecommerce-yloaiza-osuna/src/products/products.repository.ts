import { Categories } from '../categories/entities/categories.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category)
          throw new Error(`La categoria ${element.category} no existe`);
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const upadatedProduct = await this.productsRepository.findOneBy({
      id,
    });
    return upadatedProduct;
  }
}
