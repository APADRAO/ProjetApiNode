import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tarefas')
export class User {
    @PrimaryGeneratedColumn('increment')
    idTarefa:number;

    @Column('int',{nullable:true})
    idUsuario:number;

    @Column('varchar', {length:300, nullable:false})
    nmTarefa:string;

    @Column('datetime', {unique:true})
    dtTarefa:Date;

    @Column('datetime', {unique:true})
    dtLembreteTarefa:Date;    

    @Column('int',{nullable:true})
    nrRecorrenciaTarefa:number;

    @Column('int',{nullable:true})
    statusTarefa:number;
    
    @Column('varchar', {length:4000, nullable:true})
    password:string;
    
    @ManyToOne(()=>User)
    @JoinColumn({name: 'idUsuario'})
    user: User;
}

