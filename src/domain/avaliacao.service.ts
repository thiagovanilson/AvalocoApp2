import { ChecklistItemDTO } from './../model/checklistItem.dto';
import { AvaliacaoDTO     } from './../model/avaliacao.dto';

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from '../config/api.config';
import { ItemCategoryDTO } from '../model/itemCategory.dto';
import { IndicatorDTO } from '../model/indicator.dto';

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
}
