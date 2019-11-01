import {MigrationInterface, QueryRunner} from "typeorm";

export class user1572594682792 implements MigrationInterface {
    name = 'user1572594682792'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(25) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `classNumber`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `classNumber` varchar(6) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `classNumber`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `classNumber` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(255) NOT NULL", undefined);
    }

}
