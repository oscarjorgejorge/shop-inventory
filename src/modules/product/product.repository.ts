import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ProductEntity } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { PaginationOptions } from 'src/common/types/base.types';

export type ProductFilters = {
  catalogId?: number;
};

export type ProductQueryOptions = PaginationOptions & {
  filters?: ProductFilters;
};

function productQueryBuilder(filters: ProductFilters) {
  const { catalogId } = filters;

  const where: Prisma.ProductWhereInput = {};

  if (catalogId !== undefined) {
    where.catalogId = Number(catalogId);
  }

  return where;
}

@Injectable()
export class ProductRepository extends BaseRepository<
  ProductEntity,
  Prisma.ProductCreateInput,
  Prisma.ProductUpdateInput,
  Prisma.ProductInclude,
  Prisma.ProductWhereInput
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'product');
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    return this.prismaService.product.findUnique({
      where: { name },
    });
  }

  async findProducts(conditions: ProductQueryOptions): Promise<ProductEntity[]> {
    const { filters = {}, page, limit } = conditions;
    const where = productQueryBuilder(filters);

    return this.findMany({ page, limit, where });
  }

  async countProducts(filters: ProductFilters): Promise<number> {
    const where = productQueryBuilder(filters);

    return this.count({ where });
  }

  async softDelete(id: number): Promise<ProductEntity> {
    return this.update(id, { status: 'DELETED' });
  }
}
