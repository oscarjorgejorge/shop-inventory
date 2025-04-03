import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { PRODUCT_STATUS, ProductStatus } from '../constants/product-status.constant';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Blue T-Shirt'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Comfortable cotton t-shirt',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 29.99
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'The stock quantity',
    example: 100
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'The ID of the catalog this product belongs to',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  catalogId: number;

  @ApiProperty({
    description: 'The status of the product',
    enum: PRODUCT_STATUS,
    default: "ACTIVE",
    required: false
  })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS)
  status?: ProductStatus;
}