export interface AvaliacaoChecklistDTO{
   codigo    : number;
   atendido  : boolean;
   observacao: string;
   
   avaliacao:{
      codigo: number,
      dataInicio : string,
      dataTermino: string,
      dataEntrega: string,
      aberta     : boolean,
      conceito   : number,
      parecer    : string,
      modelo     : {
         codigo   : number,
         nome     : string,
         descricao: string,
         congelado: boolean,
         
      }
   },
   curso:{
      codigo: number,
      nome  : string,

   },itemCheck:{
      codigo : number
   }
}