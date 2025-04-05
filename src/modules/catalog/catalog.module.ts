import { Module, forwardRef } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './catalog.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule), PrismaModule],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
  exports: [CatalogService],
})
export class CatalogModule {}
