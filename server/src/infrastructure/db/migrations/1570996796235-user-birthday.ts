import {MigrationInterface, QueryRunner} from "typeorm";

export class userBirthday1570996796235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5a42e610e667816024c15131d39`", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `postUserId` `postUserId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birthday` `birthday` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5a42e610e667816024c15131d39` FOREIGN KEY (`postUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5a42e610e667816024c15131d39`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birthday` `birthday` datetime NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `postUserId` `postUserId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5a42e610e667816024c15131d39` FOREIGN KEY (`postUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
