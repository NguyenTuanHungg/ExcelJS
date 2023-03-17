import { Controller, Get,Post,Body } from '@nestjs/common';
import { ExcelService } from './excel.service';
import {Product} from './entity/product.entity'
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('fill-data')
  async fillData(): Promise<void> {
    await this.excelService.fillData();
  }
  @Get()
    async findAll(): Promise<Product[]> {
    return this.excelService.findAll();
    }
    @Post()
  async create(@Body() product: Product): Promise< Product> {
    return this.excelService.create(product);
  }
}
    
