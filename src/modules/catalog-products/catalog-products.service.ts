import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatalogProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async countProductsByCatalogId(catalogId: number): Promise<number> {
    return this.prisma.product.count({
      where: { catalogId },
    });
  }

  async catalogExists(catalogId: number): Promise<boolean> {
    const count = await this.prisma.catalog.count({
      where: { id: catalogId },
    });

    return count > 0;
  }
}
