import { Controller, Get } from '@nestjs/common';
import { CategoryDto } from '../../../front/src/domain/category/CategoryDto';
import { CategoryService } from '../../domain/category/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('v1')
    index(): Promise<CategoryDto[]> {
        return this.categoryService.getCategories();
    }
}
