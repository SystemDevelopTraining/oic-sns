import {MigrationInterface, QueryRunner} from "typeorm";

export class user1572594101673 implements MigrationInterface {
    name = 'user1572594101673'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `license` `license` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `githubUrl` `githubUrl` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `twitterUrl` `twitterUrl` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `homePageUrl` `homePageUrl` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `homePageUrl` `homePageUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `twitterUrl` `twitterUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `githubUrl` `githubUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `license` `license` varchar(255) NOT NULL", undefined);
    }

}
