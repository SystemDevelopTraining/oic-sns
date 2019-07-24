import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1563970289846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar(255)",
                    isNullable: false
                },
                {
                    name: "age",
                    type: "int",
                    isNullable: false
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
