import { VITE_API_URL } from "../utils/env";

export interface Provincia {
  id: number;
  provincia: string;
}

export interface ProvinciasResponse {
  statusCode: number;
  message: string;
  data: Provincia[];
}

export async function fetchProvincias(): Promise<ProvinciasResponse> {
  const res = await fetch(`${VITE_API_URL}/provincias`);
  if (!res.ok) {
    throw new Error(
      `Error ${res.status}: No se pudieron cargar las provincias.`,
    );
  }
  return res.json() as Promise<ProvinciasResponse>;
}
