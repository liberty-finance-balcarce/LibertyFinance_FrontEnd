import type {
  Instrumento,
  RankingData,
  GetRankingParams,
} from "../types/instrumento-financiero";
import { TipoInstrumento } from "../types/instrumento-financiero";

const BASE_API = "http://localhost:3000/api/v1";

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

  const url = `${BASE_API}/instrumentos-financieros/?${query.toString()}`;

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
