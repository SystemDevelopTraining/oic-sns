import { CategoryDto }from './CategoryDto';

export interface CategoryRepository {
    GetCategoryItems(): Promise<CategoryDto[]>;
}