import {MigrationInterface, QueryRunner} from "typeorm";

export class userNote1571339236258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `note` `note` varchar(200) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `note` `note` varchar(200) NOT NULL", undefined);
    }

}
