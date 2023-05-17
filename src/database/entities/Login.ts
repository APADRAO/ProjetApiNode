import { Column, Entity } from "typeorm";

@Entity('Login')
export class Login {
    @Column('varchar', {length:200})
    email:string;
    @Column('varchar', {length:4000, nullable:true})
    password:string;
}