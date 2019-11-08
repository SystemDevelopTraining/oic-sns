import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CategoryDto } from "../../../front/src/domain/category/CategoryDto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    //全ての分野種別を取得する
    async getCategories(): Promise<CategoryDto[]> {
        try {
            const categories = await this.categoryRepository.find();
            return categories.map(x => ({ id: { id: x.id }, name: x.name }));
        }
        catch (e) {
            throw new BadRequestException("分野種別一覧取得に失敗しました");
        }
    }
}
