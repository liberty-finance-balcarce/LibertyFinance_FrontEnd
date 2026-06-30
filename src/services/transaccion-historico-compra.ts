import { type CreateTransaccionHistoricoCompra, type TransaccionHistoricoCompraResponse } from "../types/transaccion-historico-compra";
import { VITE_API_URL } from "../utils/env";

export async function fetchTransaccionCompra(): Promise<TransaccionHistoricoCompraResponse> {
  const res = await fetch(`${VITE_API_URL}/transaccion-historico-compra`);
  if (!res.ok) {
    throw new Error(
      `Error ${res.status}: No hay transacciones para este usuario.`,
    );
  }

  return res.json() as Promise<TransaccionHistoricoCompraResponse>;
}

export async function createTransaccionHistoricosCompra(data: CreateTransaccionHistoricoCompra) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${VITE_API_URL}/transaccion-historico-compra`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la transaccion historico de compra");
  }

  const result = await response.json();

  return result;
}
