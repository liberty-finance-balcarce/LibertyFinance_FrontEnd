export interface ResumenByInstrumento {
  id_instrumento: number;
  nombre: string;
  logo_url: string;
  tipo_instrumento: string;
  //Paquetes
  total_paquetes_comprados: number;
  total_paquetes_vendidos: number;
  tenencia_actual_paquetes: number;
  // Instrumentos
  total_instrumento_comprado: number;
  total_instrumento_vendido: number;
  tenencia_actual_instrumento: number;
  // Métricas Financieras Valuadas
  valor_promedio_compra_paquete: number;
  valor_actual_mercado_instrumento: number;
  saldo_valuado_actual_cartera: number; // tenencia_actual_instrumento * valor_actual_mercado_instrumento
  ganancia_perdida_monetaria: number;   // (Saldo Valuado + Recuperado) - Invertido
  porcentaje_retorno: number;           // Rendimiento porcentual real sobre inversión inicial
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