import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { ProductQueryOptions, ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(forwardRef(() => CatalogService))
    private readonly catalogService: CatalogService,
  ) {}

  async create(data: CreateProductDto) {
    const existingProduct = await this.productRepository.findByName(data.name);
    if (existingProduct) {
      throw new ConflictException(`Product with name "${data.name}" already exists`);
    }

    await this.catalogService.findOne(data.catalogId);

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

    if (data.catalogId) {
      await this.catalogService.findOne(data.catalogId);
    }
    return this.productRepository.update(id, data);
  }

  async findAllProducts(conditions: ProductQueryOptions) {
    return this.productRepository.findAllProducts(conditions);
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
