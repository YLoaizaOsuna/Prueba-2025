/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  //*## 3. GET /category/:id (paso 2)
  async getCategoryById(id: string) {
    const category = await this.categoriesRepository.getCategoryById(id);

    if (!category) {
      throw new NotAcceptableException(`Categoria con Id ${id} no encontrada`);
    }
    return category;
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
