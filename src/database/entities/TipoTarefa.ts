import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tipotarefa')
export class TipoTarefa {
    @PrimaryGeneratedColumn('increment')
    idtar:number;

    @Column('varchar', {length:200})
    nametar:string;
   
}