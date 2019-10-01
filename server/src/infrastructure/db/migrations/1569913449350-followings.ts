import {MigrationInterface, QueryRunner} from "typeorm";

export class followings1569913449350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `following` (`followUserId` int NOT NULL, `followeeUserId` int NOT NULL, PRIMARY KEY (`followUserId`, `followeeUserId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_1528554dbdfa1bfc66754e9fe46` FOREIGN KEY (`followUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `following` ADD CONSTRAINT `FK_afde235fd2c95ce77cb96642c6d` FOREIGN KEY (`followeeUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_afde235fd2c95ce77cb96642c6d`", undefined);
        await queryRunner.query("ALTER TABLE `following` DROP FOREIGN KEY `FK_1528554dbdfa1bfc66754e9fe46`", undefined);
        await queryRunner.query("DROP TABLE `following`", undefined);
    }

}
