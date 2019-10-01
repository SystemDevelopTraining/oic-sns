import {MigrationInterface, QueryRunner} from "typeorm";

export class user1569917436028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `note` varchar(200) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a1f1f643364cc7925e9e97bb16` (`googleProfileId`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a1f1f643364cc7925e9e97bb16`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `note` varchar(100) NOT NULL", undefined);
    }

}
