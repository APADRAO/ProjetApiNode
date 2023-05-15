import { IsNull, MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1683899146103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'Users',
                columns:[
                    {
                        name:'id',
                        type: 'int',
                        isPrimary:true,
                        generationStrategy:'increment'
                    },
                    {
                        name:'name',
                        type: 'varchar',
                        length:'200',
                        isNullable:false
                    },
                    {
                        name:'email',
                        type: 'varchar',
                        length:'200',
                        isNullable:false,
                        isUnique: true
                    },
                    {
                        name:'password',
                        type: 'varchar',
                        length:'4000',
                        isNullable:true
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
