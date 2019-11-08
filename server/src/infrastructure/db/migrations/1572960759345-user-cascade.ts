import {MigrationInterface, QueryRunner} from "typeorm";

export class userCascade1572960759345 implements MigrationInterface {
    name = 'userCascade1572960759345'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_1528554dbdfa1bfc66754e9fe46`", undefined);
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_afde235fd2c95ce77cb96642c6d`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5a42e610e667816024c15131d39`", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_1528554dbdfa1bfc66754e9fe46` FOREIGN KEY (`followUserId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_afde235fd2c95ce77cb96642c6d` FOREIGN KEY (`followeeUserId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5a42e610e667816024c15131d39` FOREIGN KEY (`postUserId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5a42e610e667816024c15131d39`", undefined);
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_afde235fd2c95ce77cb96642c6d`", undefined);
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_1528554dbdfa1bfc66754e9fe46`", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5a42e610e667816024c15131d39` FOREIGN KEY (`postUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_afde235fd2c95ce77cb96642c6d` FOREIGN KEY (`followeeUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_1528554dbdfa1bfc66754e9fe46` FOREIGN KEY (`followUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
