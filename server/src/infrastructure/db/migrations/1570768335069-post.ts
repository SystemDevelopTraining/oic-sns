import { MigrationInterface, QueryRunner } from 'typeorm';

export class post1570768335069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, `postUserId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `post` ADD CONSTRAINT `FK_5a42e610e667816024c15131d39` FOREIGN KEY (`postUserId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `post` DROP FOREIGN KEY `FK_5a42e610e667816024c15131d39`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `post`', undefined);
  }
}
