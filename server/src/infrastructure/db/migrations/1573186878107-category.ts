import {MigrationInterface, QueryRunner} from "typeorm";

export class category1573186878107 implements MigrationInterface {
    name = 'category1573186878107'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `categoryId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_1077d47e0112cad3c16bbcea6cd`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `categoryId`", undefined);
        await queryRunner.query("DROP TABLE `category`", undefined);
    }

}
