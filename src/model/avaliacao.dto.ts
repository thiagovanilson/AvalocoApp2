export interface AvaliacaoDTO{
    codigo: Int32Array;
    dataInicio: string; 
    dataTermino: string;
    dataEntrega: string;
    aberta: boolean;
    conceito: Int16Array;
    parecer: Int16Array;
}