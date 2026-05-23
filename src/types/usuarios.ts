//falta importar la interface Rol
import {type Provincia} from "./provincias";

export interface Usuario{
  dni_usuario: number
  nombre:string
  apellido:string
  mail:string
  contraseña:string
  numero_telefono:string
  direccion: string
  id_perfilinv:number
  id_codigo_referidos:number
  rol:Rol
  provincia:Provincia
}

export interface UsuariosResponse{
    statusCode:number
    message: string
    data: Usuario | Usuario[]
}

export interface CreateUsuario extends Usuario {}
export interface UpdateUsuario extends Partial<Omit<CreateUsuario, 'dni_usuario'>> {}