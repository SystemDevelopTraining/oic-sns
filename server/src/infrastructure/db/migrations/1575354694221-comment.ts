import {MigrationInterface, QueryRunner} from "typeorm";

export class comment1575354694221 implements MigrationInterface {
    name = 'comment1575354694221'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD PRIMARY KEY (`id`)", undefined);
    }

}
