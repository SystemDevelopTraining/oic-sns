import {MigrationInterface, QueryRunner} from "typeorm";

export class user1569399306645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `studentsNumber` `oicNumber` varchar(5) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `oicNumber` `studentsNumber` varchar(5) NOT NULL", undefined);
    }

}
