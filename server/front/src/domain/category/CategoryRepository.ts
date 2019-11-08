import { CategoryDto }from './CategoryDto';
import { CategoryId }from './CategoryId';

export interface CategoryRepository {

    GetCategory(id: CategoryId): Promise<CategoryDto>;

}