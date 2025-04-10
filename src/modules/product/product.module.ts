import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CatalogProductsModule } from '../catalog-products/catalog-products.module';

@Module({
  imports: [CatalogProductsModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
