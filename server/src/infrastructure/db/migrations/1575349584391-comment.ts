import {MigrationInterface, QueryRunner} from "typeorm";

export class comment1575349584391 implements MigrationInterface {
    name = 'comment1575349584391'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL, `commentUserId` int NOT NULL, `parentPostId` int NOT NULL, `text` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c13d6c999a9e7420879b31460b3` FOREIGN KEY (`commentUserId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_3c477117e0a3e5e2bb533bab561` FOREIGN KEY (`parentPostId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_3c477117e0a3e5e2bb533bab561`", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c13d6c999a9e7420879b31460b3`", undefined);
        await queryRunner.query("DROP TABLE `comment`", undefined);
    }

}
