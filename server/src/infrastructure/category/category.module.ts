import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../domain/entities/category.entity';
import { CategoryController } from '../../application/category/category.controller';
import { CategoryService } from '../../domain/category/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule { }
