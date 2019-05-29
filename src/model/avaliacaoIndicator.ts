import { AvaliacaoDTO } from './avaliacao.dto';
import { IndicatorDTO } from "./indicator.dto";

export interface AvaliacaoIndicatorDTO{

    codigo  : number;
    conceito: number;
    parecer : string;

    indicador : IndicatorDTO;
    avaliacao : AvaliacaoDTO;
    
}