import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({
    summary: 'Cargar categorias iniciales (seeder)',
    description:
      'Inserta categorias de ejemplo en la base de datos. Se usa normalmente para desarrollo/pruebas',
  })
  @ApiOkResponse({
    description: 'Categorias creadas o ya existentes',
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las categorias',
  })
  @ApiOkResponse({
    description: 'Lista de categorias',
    type: Categories,
    isArray: true,
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
