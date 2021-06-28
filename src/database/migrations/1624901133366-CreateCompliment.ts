import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliment1624901133366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Compliment",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                    },
                    {
                        name: "user_receiver",
                        type: "uuid",
                    },
                    {
                        name: "tag_id",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_UserSender_Compliment",
                        referencedTableName: "User",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],
                        onUpdate: "SET NULL",
                        onDelete: "SET NULL"
                    },
                    {
                        name: "FK_UserReceiver_Compliment",
                        referencedTableName: "User",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onUpdate: "SET NULL",
                        onDelete: "SET NULL"
                    },
                    {
                        name: "FK_Tag_Compliment",
                        referencedTableName: "Tag",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onUpdate: "SET NULL",
                        onDelete: "SET NULL"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Compliment");
    }

}
