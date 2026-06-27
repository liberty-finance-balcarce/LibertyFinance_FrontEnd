import type { Provincia } from "./provincias";
import type { Rol } from "./rol";

export interface Usuario {
  foto_perfil?: string;
  dni_usuario: number;
  nombre: string;
  apellido: string;
  mail: string;
  contraseña: string;
  numero_telefono: string;
  direccion: string;
  id_perfilinv: number;
  id_codigo_referidos: number;
  rol: Rol;
  provincia: Provincia;
  fecha_nacimiento: string;
}

export interface UsuariosResponse {
  statusCode: number;
  message: string;
  data: Usuario | Usuario[];
}

export interface CreateUsuario extends Usuario {}
export interface UpdateUsuario extends Partial<
  Omit<CreateUsuario, "dni_usuario">
> {}
