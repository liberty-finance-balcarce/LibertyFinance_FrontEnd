export interface ResumenByInstrumento {
  id_instrumento: number;
  nombre: string;
  logo_url: string;
  tipo_instrumento: string;
  total_comprado: number;
  total_vendido: number;
  balance_total: number;
  valor_promedio: number;
  valor_actual: number;
  saldo_instrumento:number;
}

export interface ResumenData {
  dni_usuario: number;
  total_instrumentos_operados: number;
  resumen: ResumenByInstrumento[];
}

export interface ResponseDTO{
  statusCode: number;
  message: string;
  data?: ResumenData;
}