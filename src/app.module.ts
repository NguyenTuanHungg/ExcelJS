import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelModule } from './excel/excel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product} from './excel/entity/product.entity'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hunghn2001',
      database: 'NestJS',
      entities: [Product],
      synchronize: true,
    }),
    ExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
