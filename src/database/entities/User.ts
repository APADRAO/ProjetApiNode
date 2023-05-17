import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar', {length:100})
    name:string;
    @Column('varchar', {length:200, unique:true})
    email:string;
    @Column('varchar', {length:4000, nullable:true})
    password:string;
}

