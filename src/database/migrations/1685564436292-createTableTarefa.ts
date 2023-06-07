import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTarefa1685564436292A implements MigrationInterface {

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
                        name:'idTipoTarefa',
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
                        name: "FK_c6f32b0ab2446317e278195c894",
                        columnNames:["id"],
                        referencedTableName:"Users",
                        referencedColumnNames:["idUsuario"] 
                    },
                    {
                        name: "tarefa_FK",
                        columnNames:["idtar"],
                        referencedTableName:"tipotarefa",
                        referencedColumnNames:["idTipoTarefa"] 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tarefa');
    }

}
