import { Injectable } from '@nestjs/common';
import * as Excel from 'exceljs';
import { createConnection, Connection, Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ExcelService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
      ) {}
    async findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }
    
    async create(product: Product): Promise<Product> {
        return this.productRepo.save(product);
      }

    async fillData(): Promise<void> {
        // Tạo workbook mới
        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Sheet1');

    //     sheet.addRow([ 'Header 2', 'Header 6']);
    //     const firstRow = sheet.getRow(12);
    //     firstRow.eachCell((cell) => {
    //      cell.style.font = { bold: true };
    // });
        function toExcelNumberFormat(value: number, decimalPlaces: number): string {
          return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(value);
        }
        
        // Sử dụng hàm để định dạng các giá trị trong tệp Excel
        sheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
            if (typeof cell.value === 'number') {
              const decimalPlaces = 8; // Số chữ số sau dấu phẩy mong muốn
              cell.value = toExcelNumberFormat(cell.value, decimalPlaces);
            }
          });
        });
        // Đọc thông tin sản phẩm từ database
    
        const products = await this.productRepo.find();
        let totalMoney=0        
        // Khởi tạo header cho sheet Excel
        sheet.columns = [
        { header: 'STT', key: 'id' },
        { header: 'Tên sản phẩm', key: 'name' },
        { header: 'Đơn vị tính', key: 'unit' },
        { header: 'Số lượng', key: 'quantity' },
        { header: 'Đơn giá', key: 'price' },
        { header: 'Thành tiền', key: 'total' },
        ];

        // Fill data vào các cell trong sheet Excel
        products.forEach((product) => {
            const total = product.quantity * product.price;

        sheet.addRow({
            id: product.id,
            name: product.name,
            unit:product.unit,
            quantity: product.quantity,
            price: product.price,
            total: total,
            
        });
        totalMoney += total
        });
        sheet.addRow({
            stt: '',
            name: 'Tổng cộng',
            unit: '',
            quantity: '',
            price: '',
            total: totalMoney
          });

        // Lưu workbook ra file Excel
        await workbook.xlsx.writeFile('output.xlsx');
    }
    }
