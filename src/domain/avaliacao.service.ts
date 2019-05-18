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

@Injectable()
export class AvalicaoService {
 
    constructor(public http: HttpClient, public gservice :GeneralService) {
    }
    public opned    : AvaliacaoDTO[];
    public schudule : AvaliacaoDTO[];
    
    findOpened(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
    }
    findscheduled(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
    }
    findAll(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
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
        // if(data.codigo == null)
        return  this.http.post <AvaliacaoChecklisDTO[]>(`${API_CONFIG.baseUrl}/avachecklist`, data, httpOptions);
        
    }
    
    getItemCheckList(codItem : number, codEvaluation: number) : Observable <AvaliacaoChecklisDTO>{
        return this.http.get<AvaliacaoChecklisDTO>(`${API_CONFIG.baseUrl}/avachecklist/${codItem}/avaliacao/${codEvaluation}`);
    } 

    saveObservatios(item : AvaliacaoChecklisDTO){
        this.http.post(`${API_CONFIG.baseUrl}/avachecklist/`, item)
        .subscribe((result: any) => {
          
        },
        (error) => {
          
        });
    }
    updateObservations(item : AvaliacaoChecklisDTO){
        this.http.put(`${API_CONFIG.baseUrl}/avachecklist/${item.codigo}`, item)
        .subscribe((result: any) => {
          
        },
        (error) => {
          
        });
    }                                                                 
}
