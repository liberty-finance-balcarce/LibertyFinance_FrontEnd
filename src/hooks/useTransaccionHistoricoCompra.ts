import { useState } from "react";
import { createTransaccionHistoricosCompra } from "../services/transaccion-historico-compra";
import type { CreateTransaccionHistoricoCompra } from "../types/transaccion-historico-compra";

export function useTransaccionHistoricoCompra() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTransaccionHistoricoCompra = async (data: CreateTransaccionHistoricoCompra) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await createTransaccionHistoricosCompra(data);
            return result;
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : "Error desconocido";
            setError(mensaje);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createTransaccionHistoricoCompra, isLoading, error };
}