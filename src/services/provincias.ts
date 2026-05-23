export interface Provincia {
  id: number;
  provincia: string;
}

export interface ProvinciasResponse {
  statusCode: number;
  message: string;
  data: Provincia[];
}

const BASE_URL: string = "http://localhost:3000/api/v1";

export async function fetchProvincias(): Promise<ProvinciasResponse> {
  const res = await fetch(`${BASE_URL}/provincias`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se pudieron cargar las provincias.`);
  }
  return res.json() as Promise<ProvinciasResponse>;
}