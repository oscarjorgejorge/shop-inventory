import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [PrismaModule, CatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
