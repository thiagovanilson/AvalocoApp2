import { UserDTO } from './user.dto';

export interface AvaliacaoDTO{
    codigo     : number,
    dataInicio : string, 
    dataTermino: string,
    dataEntrega: string,
    aberta     : boolean,
    conceito   : Int16Array,
    parecer    : string,
    avaliadores: UserDTO[],
    avaliadorModificador: UserDTO,
    
    curso:{
        codigo: number,
        nome  : string
    },	
    modelo: {
        codigo   : number,
        nome     : string,
        descricao: string
    },
    campus : {
        nome : string,
        sigla: string
    }

}