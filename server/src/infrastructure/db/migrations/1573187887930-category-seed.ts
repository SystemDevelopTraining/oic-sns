import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Category } from "../../../domain/entities/category.entity";

export class categoryseed1573187887930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const categoryRepository = await getRepository<Category>("category");
        await categoryRepository.save([
            { id: 1, name: "雑談" },
            { id: 2, name: "資格" },
            { id: 3, name: "ゲーム" },
            { id: 4, name: "インフラ" },
            { id: 5, name: "バックエンド" },
            { id: 6, name: "フロントエンド" },
            { id: 7, name: "ネットワーク" },
            { id: 8, name: "デザイン" },
            { id: 9, name: "CG" },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
