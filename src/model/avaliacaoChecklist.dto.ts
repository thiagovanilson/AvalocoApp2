export interface AvaliacaoChecklisDTO{
   codigo    : number;
   atendido  : boolean;
   observacao: string;
   
   avaliacao:{
      codigo: number
   },
   curso:{
      codigo: number,
      nome: string,

   },itemCheck:{
      codigo : number
   }
}