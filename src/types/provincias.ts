export interface Provincia {
  id: number
  provincia: string
}

export interface ProvinciasResponse {
  statusCode: number;
  message: string;
  data?: Provincia | Provincia[];
}
