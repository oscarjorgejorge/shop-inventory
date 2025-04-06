import { ApiProperty } from '@nestjs/swagger';
import { Catalog as PrismaCatalog, Product } from '@prisma/client';
import { BaseEntity } from '../../../common/types/base.types';

export class CatalogEntity implements PrismaCatalog, BaseEntity {
  @ApiProperty({ description: 'The unique identifier of the catalog' })
  id: number;

  @ApiProperty({ description: 'The name of the catalog' })
  name: string;

  @ApiProperty({
    description: 'The description of the catalog',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'The products in this catalog',
    type: 'array',
    items: { type: 'object' },
  })
  products?: Product[];

  @ApiProperty({
    description: 'When the catalog was created',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the catalog was last updated',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
