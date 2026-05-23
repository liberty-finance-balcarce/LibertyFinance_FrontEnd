export interface TransaccionHistoricoCompra {
    fecha_operacion: string;
    id_instrumento: number;
    precio_instrumento: number;
    dni_ususario: number;
}

export interface TransaccionHistoricoCompraResponse {
    status: number;
    message: string;
    data: TransaccionHistoricoCompra | TransaccionHistoricoCompra[];
}

export interface CreateTansaccionHistoricoCompra extends Omit<TransaccionHistoricoCompra, 'id_transaccion_compra'>{}
export interface UpdateTransaccionHistoricoCompra extends Partial<CreateTansaccionHistoricoCompra>{}