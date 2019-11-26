import {MigrationInterface, QueryRunner} from "typeorm";

export class user1572593941821 implements MigrationInterface {
    name = 'user1572593941821'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `study_subject` (`id` int NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `course` (`id` int NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `classNumber` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `schoolYear` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `license` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `githubUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `twitterUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `homePageUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `courseIdId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `studySubjectIdId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_6b24061d89662c335c51c433dcb` FOREIGN KEY (`courseIdId`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_5b5317cd55f332a844f90854c2e` FOREIGN KEY (`studySubjectIdId`) REFERENCES `study_subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_5b5317cd55f332a844f90854c2e`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_6b24061d89662c335c51c433dcb`", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `studySubjectIdId`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `courseIdId`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `homePageUrl`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `twitterUrl`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `githubUrl`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `license`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `schoolYear`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `classNumber`", undefined);
        await queryRunner.query("DROP TABLE `course`", undefined);
        await queryRunner.query("DROP TABLE `study_subject`", undefined);
    }

}
