import { type TransaccionHistoricoCompraResponse } from "../types/transaccion-historico-compra";
import { VITE_API_URL } from "../utils/env";

export async function fetchTransaccionCompra(): Promise<TransaccionHistoricoCompraResponse> {
  const res = await fetch(`${VITE_API_URL}/transaccion-hitorico-compra`);
  if (!res.ok) {
    throw new Error(
      `Error ${res.status}: No hay transacciones para este usuario.`,
    );
  }

  return res.json() as Promise<TransaccionHistoricoCompraResponse>;
}
