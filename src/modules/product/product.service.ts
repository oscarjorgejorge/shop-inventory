import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly catalogService: CatalogService,
  ) {}

  async create(createProductDto: CreateProductDto) {

    await this.catalogService.findOne(createProductDto.catalogId);
    return this.productRepository.create(createProductDto);
  }

  async findAll() {
    return this.productRepository.findAllWithCatalog();
  }

  async findOne(id: number) {
    return this.productRepository.findOneWithCatalog(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    if (updateProductDto.catalogId) {
      await this.catalogService.findOne(updateProductDto.catalogId);
    }
    return this.productRepository.update(id, updateProductDto);
  }

  async softDelete(id: number) {
    return this.softDelete(id);
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }
}