export interface TransaccionHistoricoVenta {
  fecha_operacion: string;
  id_instrumento: number;
  precio_instrumento: number;
  dni_usuario: number;
}

export interface TransaccionHistoricoVentaResponse {
  statusCode: number;
  message: string;
  data?: TransaccionHistoricoVenta | TransaccionHistoricoVenta[];
}
