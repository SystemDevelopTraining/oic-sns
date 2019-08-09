import {MigrationInterface, QueryRunner} from "typeorm";

export class test1565335472106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `id` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `age`");
        await queryRunner.query("ALTER TABLE `user` ADD `sex` enum ('男', '女') NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `studentsNumber` varchar(5) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `birthday` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `note` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` bigint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `user` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `user` ADD `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `birthday`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `studentsNumber`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `sex`");
        await queryRunner.query("ALTER TABLE `user` ADD `age` int NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `id` ON `user` (`id`)");
    }

}
