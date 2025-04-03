import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
  }

  async findAllWithCatalog(): Promise<Product[]> {
    return this.findAll({ catalog: true });
  }

  async findOneWithCatalog(id: number): Promise<Product> {
    return this.findOne(id, { catalog: true });
  }

  async softDelete(id: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { status: "DELETED" }
    });
  }

}