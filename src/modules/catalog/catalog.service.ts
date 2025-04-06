import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ProductService } from '../product/product.service';
import { PaginationOptions } from 'src/common/types/base.types';

@Injectable()
export class CatalogService {
  constructor(
    private readonly catalogRepository: CatalogRepository,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
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

  async findAll(conditions: PaginationOptions) {
    return this.catalogRepository.findAll(conditions);
  }

  async findOne(id: number) {
    return this.catalogRepository.findOne(id);
  }

  async delete(id: number) {
    const products = await this.productService.findAllProducts({ filters: { catalogId: id } });

    if (products.length > 0) {
      throw new BadRequestException(
        `Cannot delete catalog with ID ${id}. It has ${products.length} associated products.`,
      );
    }
    return this.catalogRepository.delete(id);
  }
}
