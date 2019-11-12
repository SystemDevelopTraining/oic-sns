import { CategoryDto }from './CategoryDto';

export interface CategoryRepository {
    GetCategory(): Promise<CategoryDto>;
}