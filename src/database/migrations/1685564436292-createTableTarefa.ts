import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTarefa1685564436292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'tarefa',
                columns:[
                    {
                        name:'idTarefa',
                        type: 'int',
                        isPrimary:true,
                        generationStrategy:'increment'
                    },
                    {
                        name:'idUsuario',
                        type: 'int',
                        isNullable:false,
                    },
                    {
                        name:'nmTarefa',
                        type: 'varchar',
                        length:'300',
                        isNullable:false 
                    },
                    {
                        name:'dtTarefa',
                        type: 'datetime',
                        isNullable:false,
                    },
                    {
                        name:'dtLembreteTarefa',
                        type: 'datetime',
                        isNullable:false,
                    },
                    {
                        name:'nrRecorrenciaTarefa',
                        type: 'int',
                        isNullable:false,
                    },
                    {
                        name:'statusTarefa',
                        type: 'int',
                        isNullable:false,
                    },
                ],
                foreignKeys:[
                    {
                        name: "fk_User_Tarefa",
                        columnNames:["idUsuario"],
                        referencedTableName:"Users",
                        referencedColumnNames:["id"] 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tarefa');
    }

}
