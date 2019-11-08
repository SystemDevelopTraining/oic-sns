import { CategoryRepository }from '../domain/category/CategoryRepository';
import { CategoryId }from '../domain/category/CategoryId';
import { CategoryDto }from '../domain/category/CategoryDto';

export class CategoryApplication {
    private readonly repository: CategoryRepository;
    public constructor(repository: CategoryRepository){
        this.repository = repository;
    }
 
//分野種別一覧取得する
public async GetCategory(id: CategoryId): Promise<CategoryDto> {
    return this.repository.GetCategory(id);

    
}


}