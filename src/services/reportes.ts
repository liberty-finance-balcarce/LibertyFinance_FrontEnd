import { type ResumenByInstrumento, type ResponseDTO} from "../types/reportes"; ///ResponseDTO



const BASE_URL: string = "http://localhost:3000/api/v1";

export async function fetchReporteResumen(token:string|null): Promise<ResumenByInstrumento[]> {
  const res = await fetch(`${BASE_URL}/reportes/resumen`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se ha podido cargar Resumen.`);
  }
  const respuestaCompleta = await res.json() as ResponseDTO & {data: ResumenByInstrumento[]};
  return respuestaCompleta.data;
}