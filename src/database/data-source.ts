
import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUserTable1683899146103} from './migrations/1683899146103-CreateUserTable' 
import {User} from "./entities/User"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "L&nh@m@x1979",
    database: "estudante",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUserTable1683899146103],
    subscribers: [],
})

