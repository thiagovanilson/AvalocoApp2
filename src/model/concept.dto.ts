import { Injectable   } from "@angular/core";
import { IndicatorDTO } from "./indicator.dto";

@Injectable()
export class ConceptDTO{
    constructor(){

    }
    conceito  : number;
    descricao : string;
    indicador : IndicatorDTO;
}
