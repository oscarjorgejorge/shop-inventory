import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { Catalog } from '@prisma/client';

@Injectable()
export class CatalogRepository extends BaseRepository<Catalog> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'catalog');
  }

  async findAllWithProducts(): Promise<Catalog[]> {
    return this.findAll({ products: true });
  }

  async findOneWithProducts(id: number): Promise<Catalog> {
    return this.findOne(id, { products: true });
  }
}