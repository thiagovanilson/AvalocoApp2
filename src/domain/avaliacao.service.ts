import { AvaliacaoDTO } from './../model/avaliacao.dto';

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AvalicaoService {
 
    constructor(public http: HttpClient) {
    }
    public opned : AvaliacaoDTO[];

    findOpened(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
    }
    findscheduled(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
    }
    findAll(): Observable<AvaliacaoDTO[]> {
        return this.http.get<AvaliacaoDTO[]>(`${API_CONFIG.baseUrl}/avaliacao`);
    }
}
