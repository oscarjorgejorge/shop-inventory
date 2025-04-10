import { ConflictException, Injectable } from '@nestjs/common';
import { ProductFilters, ProductQueryOptions, ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: CreateProductDto) {
    const existingProduct = await this.productRepository.findByName(data.name);
    if (existingProduct) {
      throw new ConflictException(`Product with name "${data.name}" already exists`);
    }

    const { catalogId, ...productData } = data;

    const dataToSave = {
      ...productData,
      catalog: {
        connect: { id: catalogId },
      },
    };

    return this.productRepository.create(dataToSave);
  }

  async update(id: number, data: UpdateProductDto) {
    if (data.name) {
      const existingProduct = await this.productRepository.findByName(data.name);

      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictException(`Product with name "${data.name}" already exists`);
      }
    }

    return this.productRepository.update(id, data);
  }

  async countProducts(filters: ProductFilters) {
    return this.productRepository.countProducts(filters);
  }

  async findProducts(conditions: ProductQueryOptions) {
    return this.productRepository.findProducts(conditions);
  }

  async findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  async softDelete(id: number) {
    return this.productRepository.softDelete(id);
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }
}
