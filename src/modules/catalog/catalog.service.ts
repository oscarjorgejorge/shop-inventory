import { Injectable } from '@nestjs/common';
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
    return this.catalogRepository.findAll();

    // return this.catalogRepository.findAllWithProducts();
  }

  async findOne(id: number){
    return this.catalogRepository.findOne(id);
  }

  async update(id: number, data: UpdateCatalogDto){
    return this.catalogRepository.update(id, data);
  }

  async delete(id: number) {
    return this.catalogRepository.delete(id);
  }
}