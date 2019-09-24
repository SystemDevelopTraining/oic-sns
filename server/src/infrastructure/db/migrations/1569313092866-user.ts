import {MigrationInterface, QueryRunner} from "typeorm";

export class user1569313092866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `gogleProfileId` `googleProfileId` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `googleProfileId` `gogleProfileId` varchar(255) NOT NULL", undefined);
    }

}
