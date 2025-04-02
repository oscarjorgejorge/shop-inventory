import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({
    description: 'The name of the catalog',
    example: 'Summer Collection'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'The description of the catalog',
    example: 'Collection for Summer 2024',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}