import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar', {length:100})
    name:string;
    @Column('varchar', {length:200})
    email:string;
    @Column('varchar', {length:200, nullable:true})
    password:string;
}