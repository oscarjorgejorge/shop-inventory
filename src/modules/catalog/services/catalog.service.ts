import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CatalogRepository } from '../repositories/catalog.repository';
import { CreateCatalogDto } from '../dto/create-catalog.dto';
import { UpdateCatalogDto } from '../dto/update-catalog.dto';
import { PaginationOptions } from 'src/common/types/base.types';
import { CatalogProductsService } from '../../catalog-products/catalog-products.service';

@Injectable()
export class CatalogService {
  constructor(
    private readonly catalogRepository: CatalogRepository,
    private readonly catalogProductsService: CatalogProductsService,
  ) {}

  async create(data: CreateCatalogDto) {
    const existingCatalog = await this.catalogRepository.findByName(data.name);
    if (existingCatalog) {
      throw new ConflictException(`Catalog with name "${data.name}" already exists`);
    }

    return this.catalogRepository.create(data);
  }

  async update(id: number, data: UpdateCatalogDto) {
    if (data.name) {
      const existingCatalog = await this.catalogRepository.findByName(data.name);
      if (existingCatalog && existingCatalog.id !== id) {
        throw new ConflictException(`Catalog with name "${data.name}" already exists`);
      }
    }

    return this.catalogRepository.update(id, data);
  }

  async findMany(conditions: PaginationOptions) {
    return this.catalogRepository.findMany(conditions);
  }

  async findOne(id: number) {
    return this.catalogRepository.findOne(id);
  }

  async delete(id: number) {
    const numberOfproducts = await this.catalogProductsService.countProductsByCatalogId(id);

    if (numberOfproducts > 0) {
      throw new BadRequestException(
        `Cannot delete catalog with ID ${id}. It has ${numberOfproducts} associated products.`,
      );
    }
    return this.catalogRepository.delete(id);
  }
}
