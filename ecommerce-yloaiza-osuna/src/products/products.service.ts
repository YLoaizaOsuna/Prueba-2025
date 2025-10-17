import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProduct(id: number) {
    return this.productsRepository.getProductById(id);
  }

  addProduct(product: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.productsRepository.addProduct(product);
  }

  updateProduct(id: number, productNewData: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.productsRepository.updateproduct(id, productNewData);
  }
  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
