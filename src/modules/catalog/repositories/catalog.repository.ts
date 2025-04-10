import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { CatalogEntity } from '../entities/catalog.entity';
import { Prisma } from '@prisma/client';

type CatalogInclude = {
  products?: boolean;
};

@Injectable()
export class CatalogRepository extends BaseRepository<
  CatalogEntity,
  Prisma.CatalogCreateInput,
  Prisma.CatalogUpdateInput,
  CatalogInclude
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'catalog');
  }

  async findByName(name: string): Promise<CatalogEntity | null> {
    return this.prismaService.catalog.findUnique({
      where: { name },
    });
  }
}
