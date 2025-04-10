import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CatalogProductsService } from './catalog-products.service';

@Module({
  imports: [PrismaModule],
  providers: [CatalogProductsService],
  exports: [CatalogProductsService],
})
export class CatalogProductsModule {}
