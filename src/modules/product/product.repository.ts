import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ProductEntity } from './entities/product.entity';
import { Prisma } from '@prisma/client';

type ProductInclude = {
  catalog?: boolean;
};


@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity,
Prisma.ProductCreateInput,
Prisma.ProductUpdateInput,
ProductInclude>  {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
  }

  async findAllWithCatalog() {
    return this.findAll({ catalog: true });
  }

  async findOneWithCatalog(id: number) {
    return this.findOne(id, { catalog: true });
  }

  async softDelete(id: number) {
    return this.update(id, { status: "DELETED" });
  }

}