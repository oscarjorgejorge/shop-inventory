import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindProductsDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter products by catalog ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  catalogId?: number;
}
