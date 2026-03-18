import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/categories.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  //*## 3. GET /category/:id
  async getCategoryById(id: string): Promise<Categories | null> {
    return await this.ormCategoriesRepository.findOne({
      where: { id },
    });
  }

  async addCategories(): Promise<string> {
    const insertPromises = data.map((element) =>
      this.ormCategoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute(),
    );
    await Promise.all(insertPromises);
    return 'Categorias agregadas';
  }
}
