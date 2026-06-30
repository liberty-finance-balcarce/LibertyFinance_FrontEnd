export interface TransaccionHistoricoCompra {
    fecha_operacion: string;
    id_instrumento: number;
    precio_instrumento: number;
    cantidad_paquetes: number;
    precio_paquete: number;
    dni_usuario: number;
    cantidad_instrumento_comprado: number;
}

export interface TransaccionHistoricoCompraResponse {
    status: number;
    message: string;
    data: TransaccionHistoricoCompra | TransaccionHistoricoCompra[];
}

export interface CreateTransaccionHistoricoCompra extends Omit<TransaccionHistoricoCompra, 'id_transaccion_compra'> { }
export interface UpdateTransaccionHistoricoCompra extends Partial<CreateTransaccionHistoricoCompra> { }