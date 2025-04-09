import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { FindProductsDto } from './dto/find-products.dto';
import { CatalogExistsGuard } from './guards/catalog-exists.guard';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(CatalogExistsGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully created.',
    type: ProductEntity,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all products',
    type: [ProductEntity],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'catalogId',
    required: false,
    description: 'Filter products by catalog ID',
    type: Number,
  })
  async findAll(@Query() query: FindProductsDto) {
    const { page, limit, ...filters } = query;

    return this.productService.findProducts({ page, limit, filters });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', description: 'Product identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found product',
    type: ProductEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CatalogExistsGuard)
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been successfully updated.',
    type: ProductEntity,
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Patch(':id/soft-delete')
  @ApiOperation({ summary: 'Soft delete a product' })
  @ApiParam({ name: 'id', description: 'Product identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been marked as deleted',
    type: ProductEntity,
  })
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.softDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hard delete a productS' })
  @ApiParam({ name: 'id', description: 'Product identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been permanently deleted',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
