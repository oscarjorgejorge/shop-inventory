import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';



@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(data: CreateCatalogDto) {
    return this.catalogRepository.create(data);
  }

  async findAll(){
    return this.catalogRepository.findAllWithProducts();
  }

  async findOne(id: number){
    const catalog = await this.catalogRepository.findOne(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }
    return catalog;
  }

  async findOneWithProducts(id: number) {
    const catalog = await this.catalogRepository.findOneWithProducts(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }
    return catalog;
  }

  async update(id: number, data: UpdateCatalogDto){
    return this.catalogRepository.update(id, data);
  }

  async delete(id: number) {
    return this.catalogRepository.delete(id);
  }
}