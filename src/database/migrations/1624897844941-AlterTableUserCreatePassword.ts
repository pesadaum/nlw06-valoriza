import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUserCreatePassword1624897844941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("User", new TableColumn({
            name: "password",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("User", "password")
    }

}
