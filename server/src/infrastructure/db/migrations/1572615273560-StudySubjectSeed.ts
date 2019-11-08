import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { StudySubject } from "../../../domain/entities/study-subject.entity";

export class StudySubjectSeed1572615273560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const studySubjectRepository = await getRepository<StudySubject>("study_subject");
        await studySubjectRepository.save([
            { id: 1, name: "総合情報メディア学科" },
            { id: 2, name: "情報システム開発学科" },
            { id: 3, name: "情報処理学科" },
            { id: 4, name: "ITテクニカル学科" },
            { id: 5, name: "ITビジネス学科" },
            { id: 6, name: "メディアクリエイト学科" },
            { id: 7, name: "ゲーム学科" },
            { id: 8, name: "メディアデザイン学科" },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
