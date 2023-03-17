import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {Product} from './entity/product.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ExcelController],
  providers: [ExcelService]
})
export class ExcelModule {}
