import { Module } from '@nestjs/common';
import { CatalogService } from './services/catalog.service';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './repositories/catalog.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CatalogProductsModule } from '../catalog-products/catalog-products.module';

@Module({
  imports: [CatalogProductsModule, PrismaModule],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
  exports: [CatalogService],
})
export class CatalogModule {}
