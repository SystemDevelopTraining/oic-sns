import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmail1573192122019 implements MigrationInterface {
    name = 'userEmail1573192122019'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
    }

}
