import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseEntity } from '../types/base.types';

export abstract class BaseRepository<
  T extends BaseEntity,
  CreateInput = unknown,
  UpdateInput = unknown,
  Include = unknown,
  Where = unknown,
> {
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async create(data: CreateInput): Promise<T> {
    return this.prisma[this.modelName].create({
      data,
    });
  }

  async count(options?: { where?: Where }): Promise<number> {
    return this.prisma[this.modelName].count({
      where: options?.where || {},
    });
  }

  async findMany(options?: {
    include?: Include;
    page?: number;
    limit?: number;
    where?: Where;
  }): Promise<T[]> {
    const { include, page = 1, limit = 10, where = {} } = options || {};

    const skip = (page - 1) * limit;

    return this.prisma[this.modelName].findMany({
      include,
      where,
      skip,
      take: Number(limit),
    });
  }

  async findOne(id: number, include?: Include): Promise<T> {
    const entity = await this.prisma[this.modelName].findUnique({
      where: { id },
      include,
    });

    if (!entity) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, data: UpdateInput): Promise<T> {
    try {
      return this.prisma[this.modelName].update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
  }

  async delete(id: number): Promise<T> {
    try {
      return this.prisma[this.modelName].delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
  }
}
