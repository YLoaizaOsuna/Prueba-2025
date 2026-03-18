/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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

  //*##3. GET /category/:id (paso 1)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una categoria por id',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoria',
    example: '05a0850e-64e5-4a2b-a93a-3153fe7d1c4f',
  })
  @ApiOkResponse({
    description: 'Categoria encontrada',
    type: Categories,
  })
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }
}
