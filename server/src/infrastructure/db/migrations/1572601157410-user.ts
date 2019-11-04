import {MigrationInterface, QueryRunner} from "typeorm";

export class user1572601157410 implements MigrationInterface {
    name = 'user1572601157410'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_5b5317cd55f332a844f90854c2e`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_6b24061d89662c335c51c433dcb`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `courseIdId`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `studySubjectIdId`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `courseId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `studySubjectId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_660cced3eb3232d317a712dd001` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_b80b44b33e6c81d7ec5d99d27a0` FOREIGN KEY (`studySubjectId`) REFERENCES `study_subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_b80b44b33e6c81d7ec5d99d27a0`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_660cced3eb3232d317a712dd001`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `studySubjectId`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `courseId`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `studySubjectIdId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `courseIdId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_6b24061d89662c335c51c433dcb` FOREIGN KEY (`courseIdId`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_5b5317cd55f332a844f90854c2e` FOREIGN KEY (`studySubjectIdId`) REFERENCES `study_subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
