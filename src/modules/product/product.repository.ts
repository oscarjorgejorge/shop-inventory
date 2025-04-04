import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ProductEntity } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { PaginationOptions } from 'src/common/interfaces/base.interface';

export interface ProductFilters {
  catalogId?: number
}

function productQueryBuilder(filters: ProductFilters) {
  console.log({filters})
  const {catalogId} = filters;

  const where : Prisma.ProductWhereInput = {}

  if (catalogId !== undefined) {
    where.catalogId = Number(catalogId)
  }

  return where;
}


@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity,
Prisma.ProductCreateInput,
Prisma.ProductUpdateInput,
Prisma.ProductInclude,
Prisma.ProductWhereInput>  {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
  }

  async findAllProducts(conditions: PaginationOptions<ProductFilters>) {

    const {filters = {}, page, limit} = conditions;
    const where = productQueryBuilder(filters);

    console.log({where})


    return this.findAll({page, limit, where});
  }

  async softDelete(id: number) {
    return this.update(id, { status: "DELETED" });
  }

}