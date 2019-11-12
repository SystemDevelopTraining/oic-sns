import { CategoryRepository }from '../../domain/category/CategoryRepository';
import { CategoryDto }from '../../domain/category/CategoryDto';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { ApiClient }from '../httpAdapters/ApiClient';

export class CategoryRepositoryImpl implements CategoryRepository {
    public async GetCategoryItems(): Promise<CategoryDto[]> {
        const jwt = CreateLoginApplication().GetJwt();
        const apiClient = new ApiClient(jwt);
        return await apiClient.GetCategoryItems();
    }
}