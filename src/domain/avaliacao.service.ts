import { UserService } from './user.service';
import { AvaliacaoIndicatorDTO } from './../model/avaliacaoIndicator.dto';
import { AvaliacaoChecklistDTO  } from './../model/avaliacaoChecklist.dto';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { GeneralService  } from './general.service';
import { ChecklistItemDTO} from './../model/checklistItem.dto';
import { AvaliacaoDTO    } from './../model/avaliacao.dto';
import { Injectable      } from "@angular/core";
import { Observable      } from "rxjs/Rx";
import { API_CONFIG      } from '../config/api.config';
import { IndicatorDTO    } from '../model/indicator.dto';
import { ItemCategoryDTO } from '../model/itemCategory.dto';
import { GlossaryItemDTO } from '../model/glossaryItem';

@Injectable()
export class AvalicaoService {
 
    constructor(
        public http: HttpClient, 
        public gservice : GeneralService,
        public uService : UserService) {
    }

    findOpened(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/avaliador/emandamento/${this.uService.getUserLogged().codigo}`);
    }
    findscheduled(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/avaliador/agendadas/${this.uService.getUserLogged().codigo}`);
    }
    findAll(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao/ie/${this.uService.getUserLogged().codigo}`);
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
    
    getGlossaryByEvaluation(cod: number): Observable<GlossaryItemDTO[]>{
        return this.http.get<GlossaryItemDTO[]>(`${API_CONFIG.baseUrl}/glossario/avaliacao/${cod}`);
    }

    //Get indicators values by element
    //getIndicatorosBy
    getIndicatorsOptions(cod: number): Observable<GlossaryItemDTO[]>{
        return this.http.get<GlossaryItemDTO[]>(`${API_CONFIG.baseUrl}/conceito/indicador/${cod}`);
    }
    //conceito/indicador/CODINDICADOR
    getConceitosByIndicatorCod(cod: number): Observable<IndicatorDTO[]>{
        return this.http.get<IndicatorDTO[]>(`${API_CONFIG.baseUrl}/indicador/avaliacao/${cod}`);
    } 
    //Used to save the value and observation
    saveItemCheckList(data : AvaliacaoChecklistDTO): Observable<AvaliacaoChecklistDTO[]>{
      
        const httpOptions = {
            headers: new HttpHeaders({
                'contentType': 'application/json',
                'dataType'   : 'json',
                'crossDomain': 'true',
            })
        };
        this.getItemCheckList(data.itemCheck.codigo, data.avaliacao.codigo).subscribe(
            response => {
              
              if(response != null && response.codigo+"" != "" ){
               return  this.http.put <AvaliacaoChecklistDTO[]>(`${API_CONFIG.baseUrl}/avachecklist/${response.codigo}/avaliacao/${data.avaliacao.codigo}`, data, httpOptions);
              }
            }
        );

        //If does exist on database he create. Else he edit.
        return  this.http.post <AvaliacaoChecklistDTO[]>(`${API_CONFIG.baseUrl}/avachecklist`, data, httpOptions);        
    }
    //BUILDING
    saveItemIndicator(data : AvaliacaoIndicatorDTO){
      
        //this.gservice.showMessage(data.user.nome);
        const httpOptions = {
            headers: new HttpHeaders({
                'contentType': 'application/json',
                'dataType'   : 'json',
                'crossDomain': 'true',
            })
        };
        // this.getAvaIndicator(data.indicador.codigo, data.avaliacao.codigo).subscribe(
        //     response => {
        //         if(response != null ){              
        //             this.gservice.showMessage(response.indicador.codigo);
        //             return  this.http.put <AvaliacaoIndicatorDTO>(`${API_CONFIG.baseUrl}/avaindicador/${response.codigo}`, data, httpOptions);
        //         }
        //     }
        // );
        //If does exist on database he create. Else he edit.
        return  this.http.post (`${API_CONFIG.baseUrl}/avaindicador`, data, httpOptions);
        
    }

    //Used to select the right value on the screen.
    getItemCheckList(codItem : number, codEvaluation: number) : Observable <AvaliacaoChecklistDTO>{
        return this.http.get<AvaliacaoChecklistDTO>(`${API_CONFIG.baseUrl}/avachecklist/${codItem}/avaliacao/${codEvaluation}`);
    } 
    //Used to get the current value of indicator
    getAvaIndicator(codItem : number, codEvaluation: number) : Observable <AvaliacaoIndicatorDTO>{
        return this.http.get<AvaliacaoIndicatorDTO>(`${API_CONFIG.baseUrl}/avaindicador/${codItem}/avaliacao/${codEvaluation}`);
    }  
                                                                       
    //avaindicado/avaliacao/CODAVALIACAO


    updateObservations(item : AvaliacaoChecklistDTO){
        this.http.put(`${API_CONFIG.baseUrl}/avachecklist/${item.codigo}`, item)
        .subscribe((result: any) => {
          
        },
        (error) => {
          
        });
    }  
    updateObservationsIndicator(item : AvaliacaoIndicatorDTO){
        this.http.put(`${API_CONFIG.baseUrl}/avaindicador/${item.codigo}`, item)
        .subscribe((result: any) => {
          
        },
        (error) => {
          
        });
    }                                                                   
}
