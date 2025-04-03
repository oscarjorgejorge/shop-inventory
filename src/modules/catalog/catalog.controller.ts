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
  } from '@nestjs/common';
  import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiParam 
  } from '@nestjs/swagger';
  import { CatalogService } from './catalog.service';
  import { CreateCatalogDto } from './dto/create-catalog.dto';
  import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { CatalogEntity } from './entities/catalog.entity';
  
  @ApiTags('catalogs')
  @Controller('catalogs')
  export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new catalog' })
    @ApiResponse({ 
      status: HttpStatus.CREATED, 
      description: 'The catalog has been successfully created.',
      type: CatalogEntity
    })
    async create(@Body() createCatalogDto: CreateCatalogDto) {
      return this.catalogService.create(createCatalogDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all catalogs' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'List of all catalogs',
      type: [CatalogEntity] 
    })
    async findAll() {
      return this.catalogService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a catalog by id' })
    @ApiParam({ name: 'id', description: 'Catalog identifier' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'The found catalog',
      type: CatalogEntity 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Catalog not found' 
    })
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.catalogService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a catalog' })
    @ApiParam({ name: 'id', description: 'Catalog identifier' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'The catalog has been successfully updated.',
      type: CatalogEntity 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Catalog not found' 
    })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCatalogDto: UpdateCatalogDto,
    ) {
      return this.catalogService.update(id, updateCatalogDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a catalog' })
    @ApiParam({ name: 'id', description: 'Catalog identifier' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'The catalog has been successfully deleted.' 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Catalog not found' 
    })
    async delete(@Param('id', ParseIntPipe) id: number) {
      return this.catalogService.delete(id);
    }
  }