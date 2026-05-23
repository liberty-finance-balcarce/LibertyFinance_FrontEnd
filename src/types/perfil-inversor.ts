export enum PerfilInversorEnum {
  CONSERVADOR = "Conservador",
  MODERADO = "Moderado",
  AGRESIVO = "Agresivo",
}

export interface PerfilInversor {
  id_perfil_inversor: number;
  nombre: PerfilInversorEnum;
}

export interface PerfilInversorResponse {
  statusCode: number;
  message: string;
  data?: PerfilInversor | PerfilInversor[];
}
