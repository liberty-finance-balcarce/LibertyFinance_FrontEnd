import { type ResumenByInstrumento, type ResponseDTO } from "../types/reportes";
import { VITE_API_URL } from "../utils/env";

export async function fetchReporteResumen(
  token: string | null,
): Promise<ResumenByInstrumento[]> {
  const res = await fetch(`${VITE_API_URL}/reportes/resumen`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  if (!res.ok) {
    throw new Error(`No se ha podido cargar resumen o resumen inexistente.`);
  }
  const respuestaCompleta = (await res.json()) as ResponseDTO & {
    data: ResumenByInstrumento[];
  };
  return respuestaCompleta.data;
}
