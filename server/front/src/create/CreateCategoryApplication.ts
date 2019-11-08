import { CategoryApplication }from '../application/CategoryApplication';

export function CreateCategoryApplication() {
    return new CategoryApplication(new CategoryApplicationImpl());
}