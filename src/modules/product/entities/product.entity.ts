import { ApiProperty } from '@nestjs/swagger';
import { Product as PrismaProduct } from '@prisma/client';
import { BaseEntity } from '../../../common/interfaces/base.interface';
import { CatalogEntity } from '../../catalog/entities/catalog.entity';
import { PRODUCT_STATUS, ProductStatus } from '../constants/product-status.constant';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductEntity implements PrismaProduct, BaseEntity {
  @ApiProperty({ description: 'The unique identifier of the product' })
  id: number;

  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @ApiProperty({ 
    description: 'The description of the product',
    required: false,
    nullable: true 
  })
  description: string | null;

  @ApiProperty({ description: 'The price of the product' })
  price: Decimal;

  @ApiProperty({ description: 'The stock quantity' })
  stock: number;

  @ApiProperty({ description: 'The ID of the catalog this product belongs to' })
  catalogId: number;

  @ApiProperty({ 
    description: 'The catalog this product belongs to',
    type: () => CatalogEntity 
  })
  catalog?: CatalogEntity;

  @ApiProperty({ 
    description: 'When the product was created',
    type: 'string',
    format: 'date-time' 
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'When the product was last updated',
    type: 'string',
    format: 'date-time' 
  })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'The status of the product',
    enum: PRODUCT_STATUS,
    default: "ACTIVE",
  })
  status: ProductStatus;
}