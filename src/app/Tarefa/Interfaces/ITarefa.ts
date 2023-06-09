
import { IUser } from './../../User/interfaces/IUser';
export interface ITarefa{
    idTarefa:number,
    idUsuario:number,
    idTipoTarefa:number,
    nmTarefa:string,
    dtTarefa:Date,
    dtLembreteTarefa:Date,    
    nrRecorrenciaTarefa:number,
    statusTarefa:number,
    password:string,
    tipotarefa:ItipoTarefa,
    user: IUser
}
export interface ItipoTarefa{
    idTipoTarefa:number,
    nametar:string,
}