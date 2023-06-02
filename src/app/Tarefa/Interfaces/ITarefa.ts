import { IUser } from './../../User/interfaces/IUser';
export interface ITarefa{
    idTarefa:number,
    idUsuario:number,
    nmTarefa:string,
    dtTarefa:Date,
    dtLembreteTarefa:Date,    
    nrRecorrenciaTarefa:number,
    statusTarefa:number,
    password:string,
    user: IUser
}