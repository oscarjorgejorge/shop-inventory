import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseEntity } from '../interfaces/base.interface';

export abstract class BaseRepository<T extends BaseEntity,
CreateInput = unknown,
UpdateInput = unknown,
Include = unknown> {
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async create(data: CreateInput): Promise<T> {
    return this.prisma[this.modelName].create({
      data,
    });
  }

  async findAll(include?: Include): Promise<T[]> {
    return this.prisma[this.modelName].findMany({
      include,
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