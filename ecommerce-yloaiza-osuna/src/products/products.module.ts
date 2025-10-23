import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Categories } from 'src/categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
