import type {
  CreateInstrumentoFinanciero,
  UpdateInstrumentoFinanciero,
} from "../types/instrumento-financiero";
import type {
  Instrumento,
  RankingData,
  GetRankingParams,
} from "../types/instrumento-financiero";
import { TipoInstrumento } from "../types/instrumento-financiero";
import { VITE_API_URL } from "../utils/env";

export async function getRankingInstrumentos(
  params?: GetRankingParams,
): Promise<RankingData> {
  const query = new URLSearchParams();

  if (params?.orderby) query.append("orderby", params.orderby);
  if (params?.limit != null) query.append("limit", params.limit.toString());
  if (params?.skip != null) query.append("skip", params.skip.toString());
  if (params?.riesgo) query.append("riesgo", params.riesgo);
  if (params?.tipo_instrumento)
    query.append("tipo_instrumento", params.tipo_instrumento);
  if (params?.precio_instrumento != null) {
    query.append("precio_instrumento", params.precio_instrumento.toString());
  }

  const url = `${VITE_API_URL}/instrumentos-financieros/?${query.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    // Se convierte la respuesta a JSON para poder ver el mensaje
    const errorData = await response.json().catch(() => {
      throw new Error(
        errorData.message || "Error al comunicarse con el servidor",
      );
    });
  }

  const result = await response.json();
  const instrumentos: Instrumento[] = result.data || result;

  const tradicionales: Instrumento[] = [];
  const noTradicionales: Instrumento[] = [];

  instrumentos.forEach((item) => {
    if (item.tipo_instrumento === TipoInstrumento.TRADICIONAL) {
      tradicionales.push(item);
    } else {
      noTradicionales.push(item);
    }
  });

  return { tradicionales, noTradicionales };
}

export async function getInstrumentos() {
  const response = await fetch(`${VITE_API_URL}/instrumentos-financieros`);

  if (!response.ok) {
    throw new Error("Error al cargar los instrumentos");
  }
  const result = await response.json();

  return result.data;
}

export async function deleteInstrumentos(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${VITE_API_URL}/instrumentos-financieros/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error al eliminar el instrumento");
  }

  return await response.json();
}

export async function crearInstrumento(data: CreateInstrumentoFinanciero) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${VITE_API_URL}/instrumentos-financieros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Detalle del error 400 del Backend:", errorData);
    throw new Error("Error al crear el instrumento");
  }

  const result = await response.json();

  return result;
}

export async function updateInstrumento(
  id: number,
  data: UpdateInstrumentoFinanciero,
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${VITE_API_URL}/instrumentos-financieros/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  const result = await response.json();

  return result;
}
