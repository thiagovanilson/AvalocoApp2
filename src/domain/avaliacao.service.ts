import { GeneralService } from './general.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AvaliacaoChecklisDTO   } from '../model/avaliacaoChecklist.dto';
import { ChecklistItemDTO} from './../model/checklistItem.dto';
import { AvaliacaoDTO    } from './../model/avaliacao.dto';
import { Injectable      } from "@angular/core";
import { Observable      } from "rxjs/Rx";
import { API_CONFIG      } from '../config/api.config';
import { IndicatorDTO    } from '../model/indicator.dto';
import { ItemCategoryDTO } from '../model/itemCategory.dto';
import { AvaliacaoIndicatorDTO } from '../model/avaliacaoIndicator';

@Injectable()
export class AvalicaoService {
 
    constructor(public http: HttpClient, public gservice :GeneralService) {
    }

    // public opned    : AvaliacaoDTO[];
    // public schudule : AvaliacaoDTO[];
    
    findOpened(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/avaliador/emandamento/1`);
    }
    findscheduled(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/avaliador/agendadas/1`);
    }
    findAll(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/ie/1`);
    }

    //Get checklist categories
    getChecklistCategory(id : number ) : Observable<ItemCategoryDTO[]> {
        return this.http.get<ItemCategoryDTO[]>(`${API_CONFIG.baseUrl}/categoria/avaliacao/${id}`);
    }
    //Get checklist itens by cod
    getItensByCategory(cod: number): Observable<ChecklistItemDTO[]>{
        return this.http.get<ChecklistItemDTO[]>(`${API_CONFIG.baseUrl}/checklist/categoria/${cod}`);
    }

    //change the path
    getIndicatorByEvaluation(cod: number): Observable<IndicatorDTO[]>{
        return this.http.get<IndicatorDTO[]>(`${API_CONFIG.baseUrl}/indicador/avaliacao/${cod}`);
    }
    
    getGlossaryByEvaluation(cod: number): Observable<GlossaryItemrDTO[]>{
        return this.http.get<GlossaryItemrDTO[]>(`${API_CONFIG.baseUrl}/glossario/avaliacao/${cod}`);
    }
     
    //Used to save the value and observation
    saveItemCheckList(data : AvaliacaoChecklisDTO): Observable<AvaliacaoChecklisDTO[]>{
      
        const httpOptions = {
            headers: new HttpHeaders({
                'contentType': 'application/json',
                'dataType'   : 'json',
                'crossDomain': 'true',
                //'Authorization': 'lucianocomputador@gmail.com'
            })
        };
        this.getItemCheckList(data.itemCheck.codigo, data.avaliacao.codigo).subscribe(
            response => {
              
              if(response != null && response.codigo+"" != "" ){
                //response.atendido = data.atendido;
                console.log("tentando gravar:\n\ncod item: " + data.itemCheck.codigo+
                "\nAtendido: " + data.atendido +"\nObservação: " + data.observacao);
                return  this.http.put <AvaliacaoChecklisDTO[]>(`${API_CONFIG.baseUrl}/avachecklist/${response.codigo}/avaliacao/${data.avaliacao.codigo}`, data, httpOptions);

              }
            }
        );
        //If does exist on database he create. Else he edit.
        return  this.http.post <AvaliacaoChecklisDTO[]>(`${API_CONFIG.baseUrl}/avachecklist`, data, httpOptions);        
    }
    //BUILDING
    saveItemIndicator(data : AvaliacaoIndicatorDTO){
      
        const httpOptions = {
            headers: new HttpHeaders({
                'contentType': 'application/json',
                'dataType'   : 'json',
                'crossDomain': 'true',
            })
        };
        this.getAvaIndicator(data.indicador.codigo, data.avaliacao.codigo).subscribe(
            response => {
              
              if(response != null && response.codigo+"" != "" ){              
                return  this.http.put (`${API_CONFIG.baseUrl}/avaindicador/${response.codigo}/avaliacao/${data.avaliacao.codigo}`, data, httpOptions);
              }
            }
        );
        //If does exist on database he create. Else he edit.
        return  this.http.post (`${API_CONFIG.baseUrl}/avaindicador`, data, httpOptions);
        
    }
    //Used to select the right value on the screen.
    getItemCheckList(codItem : number, codEvaluation: number) : Observable <AvaliacaoChecklisDTO>{
        return this.http.get<AvaliacaoChecklisDTO>(`${API_CONFIG.baseUrl}/avachecklist/${codItem}/avaliacao/${codEvaluation}`);
    } 
    //Used to get the current value of indicator
    getAvaIndicator(codItem : number, codEvaluation: number) : Observable <AvaliacaoIndicatorDTO>{
        return this.http.get<AvaliacaoIndicatorDTO>(`${API_CONFIG.baseUrl}/avaindicador/${codItem}/avaliacao/${codEvaluation}`);
    }                                                                     

    updateObservations(item : AvaliacaoChecklisDTO){
        this.http.put(`${API_CONFIG.baseUrl}/avachecklist/${item.codigo}`, item)
        .subscribe((result: any) => {
          
        },
        (error) => {
          
        });
    }                                                                 
}
