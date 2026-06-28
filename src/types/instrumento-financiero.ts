export type RankingData = {
  tradicionales: Instrumento[];
  noTradicionales: Instrumento[];
};

export type GetRankingParams = {
  orderby?: string;
  limit?: number;
  skip?: number;
  riesgo?: Riesgo;
  tipo_instrumento?: TipoInstrumento;
  precio_instrumento?: number;
};

export type Instrumento = {
  id_instrumento: number;
  nombre_instrumento: string;
  rendimiento: number;
  riesgo: Riesgo;
  precio_instrumento: number;
  tipo_instrumento: TipoInstrumento;
  logo_url: string;
};

export enum Riesgo {
  BAJO = "Bajo",
  MEDIO = "Medio",
  ALTO = "Alto",
}

export enum TipoInstrumento {
  TRADICIONAL = "Tradicional",
  NO_TRADICIONAL = "No tradicional",
}

export interface CreateInstrumentoFinanciero extends Partial<
  Omit<Instrumento, "id_instrumento">
> {}

export interface UpdateInstrumentoFinanciero extends Partial<
  Omit<CreateInstrumentoFinanciero, "id_instrumento">
> {}
