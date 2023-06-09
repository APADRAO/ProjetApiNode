
import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./entities/User"
import { Tarefa } from "./entities/Tarefas"
import { TipoTarefa } from "./entities/TipoTarefa"
import { CreateUser1686327625593 } from "./migrations/1686327625593-CreateUser"
import { CreateTipoTarefa1686327606726 } from "./migrations/1686327606726-CreateTipoTarefa"
import { CreateTarefa1686327635299 } from "./migrations/1686327635299-CreateTarefa"
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
    migrations: [CreateTipoTarefa1686327606726,CreateUser1686327625593,CreateTarefa1686327635299 ],
    subscribers: [],
})

