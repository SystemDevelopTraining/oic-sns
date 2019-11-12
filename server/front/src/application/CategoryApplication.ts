import { CategoryRepository }from '../domain/category/CategoryRepository';
import { CategoryDto }from '../domain/category/CategoryDto';

export class CategoryApplication {
    private readonly repository: CategoryRepository;
    public constructor(repository: CategoryRepository){
        this.repository = repository;
    }
//分野種別一覧取得する
    public async GetCategoryItems(): Promise<CategoryDto[]> {
        return this.repository.GetCategoryItems();
    }
}