import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Course } from "../../../domain/entities/course.entity";

export class CourseSeed1572613178878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const courseRepository = await getRepository<Course>("course");
        await courseRepository.save([
            { id: 1, name: "ITスペシャリスト専攻" },
            { id: 2, name: "ネットワークセキュリティ専攻" },
            { id: 3, name: "システムエンジニア専攻" },
            { id: 4, name: "ネットワークエンジニア専攻" },
            { id: 5, name: "Webエンジニア専攻" },
            { id: 6, name: "テクニカルコース" },
            { id: 7, name: "ネットワークシステムコース" },
            { id: 8, name: "ITシステムエンジニアコース" },
            { id: 9, name: "ITネットワークエンジニアコース" },
            { id: 10, name: "ITビジネスコース" },
            { id: 11, name: "OAパソコンコース" },
            { id: 12, name: "ゲームプランナー専攻" },
            { id: 13, name: "ゲームプログラマー専攻" },
            { id: 14, name: "ゲームデザイナー専攻" },
            { id: 15, name: "ゲームクリエイター専攻（PG）" },
            { id: 16, name: "ゲームクリエイター専攻（CG）" },
            { id: 17, name: "ゲームプログラムコース" },
            { id: 18, name: "ゲームCGデザインコース" },
            { id: 19, name: "CG映像クリエイター専攻" },
            { id: 20, name: "CGクリエイター専攻" },
            { id: 21, name: "CG映像コース" },
            { id: 22, name: "CGアニメーションコース" },
            { id: 23, name: "アートディレクター専攻" },
            { id: 24, name: "マンガイラストコース" },
            { id: 25, name: "グラフィックデザインコース" },
            { id: 26, name: "Webデザインコース" },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
