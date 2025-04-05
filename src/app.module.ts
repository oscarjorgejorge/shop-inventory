import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [CatalogModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
