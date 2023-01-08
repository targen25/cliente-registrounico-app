export interface GastoDiarioResponse {
     anoEje : number;
     mesEje : number;
     nivelGobiernoNombre: string;
     sectorNombre: string;
     pliegoNombre: string;
     departamentoEjecutoraNombre: string;
     provinciaEjecutoraNombre: string;
     distritoEjecutoraNombre: string;
     programaPptoNombre: string;
     especificaDetNombre: string;
     montoCertificado: number;
     montoComprometidoAnual: number;
     montoGirado: number;
     pageTotalSize:number;
}    

export interface GastoDiarioRequest {
     anoEje : number;
     mesEje : number;
     page : number;
     size : number;
}  