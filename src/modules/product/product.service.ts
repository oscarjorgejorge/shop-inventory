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

  async create(data: CreateProductDto) {

    await this.catalogService.findOne(data.catalogId);

    const dataToSave = {
      ...data,
      catalog: {
        connect: { id: data.catalogId }
      }
    };

    return this.productRepository.create(dataToSave);
  }

  async findAll() {
    return this.productRepository.findAllWithCatalog();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product
  }


  async findOneWithCatalog(id: number) {
    const product = await this.productRepository.findOneWithCatalog(id);
    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
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