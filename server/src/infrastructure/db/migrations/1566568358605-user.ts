import {MigrationInterface, QueryRunner} from "typeorm";

export class user1566568358605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `sex` enum ('男', '女') NOT NULL, `studentsNumber` varchar(5) NOT NULL, `birthday` datetime NOT NULL, `note` varchar(100) NOT NULL, `gogleProfileId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
