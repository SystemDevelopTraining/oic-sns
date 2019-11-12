import { CategoryRepository }from '../../domain/category/CategoryRepository';
import { CategoryDto }from '../../domain/category/CategoryDto';
import { ApiClient }from '../httpAdapters/ApiClient';

export class CategoryRepositoryImpl implements CategoryRepository {
    public async GetCategoryItems(): Promise<CategoryDto[]> {
        const apiClient = new ApiClient();
        return await apiClient.GetCategoryItems();
    }
}