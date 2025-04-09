import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { CatalogService } from 'src/modules/catalog/services/catalog.service';

@Injectable()
export class CatalogExistsGuard implements CanActivate {
  constructor(private readonly catalogService: CatalogService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const catalogId = body.catalogId;

    if (!catalogId) {
      return true;
    }

    try {
      await this.catalogService.findOne(catalogId);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Catalog with ID ${catalogId} not found`);
      }
      throw error;
    }
  }
}
