import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { CatalogProductsService } from 'src/modules/catalog-products/catalog-products.service';

@Injectable()
export class CatalogExistsGuard implements CanActivate {
  constructor(private readonly catalogProductsService: CatalogProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const catalogId = body.catalogId;

    if (!catalogId) {
      return true;
    }

    const catalogExists = await this.catalogProductsService.catalogExists(catalogId);
    if (!catalogExists) {
      throw new NotFoundException(`Catalog with ID ${catalogId} not found`);
    }
    return true;
  }
}
