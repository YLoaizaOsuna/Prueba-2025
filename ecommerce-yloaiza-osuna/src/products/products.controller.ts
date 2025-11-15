import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from './entities/products.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar productos con paginación' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numero de página(por defecto 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de productos por página (por defecto 5)',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Lista de productos',
    type: Products,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado / token inváido',
  })
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productsService.getProducts(Number(page), Number(limit));
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get('seeder')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Cargar productos de prueba (seeder)',
    description:
      'Inserta productos iniciales en la base de datos para pruebas. Si ya existen, puede devolver un mensaje informativo',
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado / token invalido',
  })
  addProducts() {
    return this.productsService.addProducts();
  }
}
