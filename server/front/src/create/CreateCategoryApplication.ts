import { CategoryApplication }from '../application/CategoryApplication';
import { CategoryRepositoryImpl }from '../infrastructure/category/CategoryRepositoryImpl';

export function CreateCategoryApplication() {
    return new CategoryApplication(new CategoryRepositoryImpl());
}