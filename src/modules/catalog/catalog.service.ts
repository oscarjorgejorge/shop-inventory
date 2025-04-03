import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(createCatalogDto: CreateCatalogDto) {
    return this.catalogRepository.create(createCatalogDto);
  }

  async findAll() {
    return this.catalogRepository.findAllWithProducts();
  }

  async findOne(id: number) {
    return this.catalogRepository.findOneWithProducts(id);
  }

  async update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return this.catalogRepository.update(id, updateCatalogDto);
  }

  async delete(id: number) {
    return this.catalogRepository.delete(id);
  }
}