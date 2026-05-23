export interface Rol {
  id_rol: number;
  nombre: string;
}

export interface RolResponse {
  statusCode: number;
  message: string;
  data?: Rol | Rol[];
}
