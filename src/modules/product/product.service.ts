import { Injectable } from '@nestjs/common';
import { ProductFilters, ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CatalogService } from '../catalog/catalog.service';
import { PaginationOptions } from 'src/common/interfaces/base.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly catalogService: CatalogService,
  ) {}

  async create(data: CreateProductDto) {

    await this.catalogService.findOne(data.catalogId);

    const { catalogId, ...productData } = data;


    const dataToSave = {
      ...productData,
      catalog: {
        connect: { id: catalogId }
      }
    };
  
    return this.productRepository.create(dataToSave);
  }

  async findAll(conditions: PaginationOptions<ProductFilters>) {
    console.log({conditions})
    return this.productRepository.findAllProducts(conditions);
  }

  async findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  async update(id: number, data: UpdateProductDto) {

    if (data.catalogId) {
      await this.catalogService.findOne(data.catalogId);
    }
    return this.productRepository.update(id, data);
  }

  async softDelete(id: number) {
    return this.softDelete(id);
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }
}