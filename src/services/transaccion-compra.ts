import { type TransaccionHistoricoCompra } from "../types/transaccion-historico-compra";
import { type TransaccionHistoricoCompraResponse } from "../types/transaccion-historico-compra";

const BASE_URL: string = "http://localhost:3000/api/v1";

export async function fetchTransaccionCompra(id_Instrumento:number,id_Usuario:number): Promise<TransaccionHistoricoCompraResponse> {
  const res = await fetch(`${BASE_URL}/transaccion-hitorico-compra`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: No hay transacciones para este usuario.`);
  }

  return res.json() as Promise<TransaccionHistoricoCompraResponse>;
}

/*
idea en lineas generales:
importar tipos
traer datos
generar respuesta
guardar datos en arreglo
realizarlos con compras y con ventas. 
Matchear segun id instrumento
generar resumen 
*/