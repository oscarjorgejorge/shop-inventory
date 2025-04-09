import { Module, forwardRef } from '@nestjs/common';
import { CatalogService } from './services/catalog.service';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './repositories/catalog.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule), PrismaModule],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
  exports: [CatalogService],
})
export class CatalogModule {}
