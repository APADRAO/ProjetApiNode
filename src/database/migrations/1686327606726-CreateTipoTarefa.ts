import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTipoTarefa1686327606726 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'tipotarefa',
                columns:[
                    {
                        name:'idTipoTarefa',
                        type: 'int',
                        isPrimary:true,
                        generationStrategy:'increment'
                    },
                    {
                        name:'nametar',
                        type: 'varchar',
                        length:'300',
                        isNullable:false 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tipotarefa');
    }

}
