export interface AvaliacaoDTO{
    codigo: number;
    dataInicio: string; 
    dataTermino: string;
    dataEntrega: string;
    aberta: boolean;
    conceito: Int16Array;
    parecer: string;
}