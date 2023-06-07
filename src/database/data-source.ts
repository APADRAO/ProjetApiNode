
import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUserTable1683899146103} from './migrations/1683899146103-CreateUserTable' 
import {User} from "./entities/User"
import { CreateTableTarefa1685564436292A } from "./migrations/1685564436292-createTableTarefa"
import { Tarefa } from "./entities/Tarefas"
import { TipoTarefa } from "./entities/TipoTarefa"
import { CreateTipoTarefa1686096600182 } from "./migrations/1686096600182-CreateTipoTarefa"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "L&nh@m@x1979",
    database: "estudante",
    synchronize: true,
    logging: false,
    entities: [User, TipoTarefa, Tarefa],
    migrations: [CreateUserTable1683899146103, CreateTipoTarefa1686096600182, CreateTableTarefa1685564436292A],
    subscribers: [],
})

