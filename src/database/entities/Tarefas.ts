import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import UserRepositorie from '../../app/User/repositories/UserRepositorie';

@Entity('tarefa')
export class Tarefa {
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
    
@ManyToOne(() => User,{eager:true /*, cascade:true*/} )
    @JoinColumn({name: 'idUsuario'})
    user: User;
}

