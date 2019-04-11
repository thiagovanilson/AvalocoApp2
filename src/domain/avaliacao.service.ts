import { ChecklistItemDTO} from './../model/checklistItem.dto';
import { AvaliacaoDTO    } from './../model/avaliacao.dto';
import { Injectable      } from "@angular/core";
import { HttpClient, HttpHeaders      } from "@angular/common/http";
import { Observable      } from "rxjs/Rx";
import { API_CONFIG      } from '../config/api.config';
import { IndicatorDTO    } from '../model/indicator.dto';
import { ItemCategoryDTO } from '../model/itemCategory.dto';
import { catchError } from 'rxjs/operators';
import { AvaliacaoChecklisDTO } from '../model/avaliacaoChecklist.dto';
//import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class AvalicaoService {
 
    constructor(public http: HttpClient) {
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
    getChecklistCategory(id : number ) : Observable<ItemCategoryDTO[]> {
        return this.http.get<ItemCategoryDTO[]>(`${API_CONFIG.baseUrl}/categoria/avaliacao/${id}`);
    }
    getItensByCategory(cod: number): Observable<ChecklistItemDTO[]>{
        return this.http.get<ChecklistItemDTO[]>(`${API_CONFIG.baseUrl}/checklist/categoria/${cod}`);
    }
    getIndicatorByCod(cod: number): Observable<IndicatorDTO[]>{
        return this.http.get<IndicatorDTO[]>(`${API_CONFIG.baseUrl}/indicador/avaliacao/${cod}`);
    }
    
    saveItemCheckList(data : AvaliacaoChecklisDTO): Observable<AvaliacaoChecklisDTO[]>{
      
        /*var data : AvaliacaoChecklisDTO  = { 
            "codigo"  : 6,
            "atendido": true,
            "observacao" :"Vanilson",
            "avaliacao":{
                "codigo": 2
            },
            "itemCheck":{
                "codigo": 2
            }
        };*/
        const httpOptions = {
            headers: new HttpHeaders({
              'contentType': 'application/json',
              'dataType': 'json',
              'crossDomain': 'true',
              //'Authorization': 'lucianocomputador@gmail.com'
            })
          };
        //If does exist on database he create. Else he edit.
        if(data.codigo == -1)
            return  this.http.post <AvaliacaoChecklisDTO[]>(`${API_CONFIG.baseUrl}/avachecklist`, data, httpOptions);
        return  this.http.put <AvaliacaoChecklisDTO[]>(`${API_CONFIG.baseUrl}/avachecklist`, data, httpOptions);
        
    }
}
