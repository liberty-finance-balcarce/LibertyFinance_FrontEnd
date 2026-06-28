import { useState, useEffect } from "react";

import { deleteUser, updateUser, getUsers } from "../services/usuarios";
import { fetchProvincias } from "../services/provincias";
import { getRoles } from "../services/usuarios";

import type { Usuario } from "../types/usuarios";
import type { Provincia } from "../types/provincias";
import type { Rol } from "../types/rol";

export function useUsuarios() { 
  const [usuariosState, setUsuariosState] = useState<Usuario[]>([]);
  const [provinciasState, setProvinciasState] = useState<Provincia[]>([]);
  const [rolesState, setRolesState] = useState<Rol[]>([]);

  useEffect(() => {
    const cargarTodo = async () => {
      try {

        const [listaUsuarios, listaProvincias, listaRoles] = await Promise.all([
          getUsers(),
          fetchProvincias(),
          getRoles(),
        ]);

        setUsuariosState(listaUsuarios);
        setProvinciasState(listaProvincias.data);
        setRolesState(listaRoles);
      } catch (error) {
        console.error("Error al cargar los datos del sistema", error);
      } 
    };

    cargarTodo();
  }, []);

  const modificarUsuarioEnLista = async (dni: number, data: any) => {
    await updateUser(dni, data);

    setUsuariosState((actuales) =>
      actuales.map((user) => (user.dni_usuario === dni ? { ...user, ...data } : user))
    );
    const nuevosUsuarios = await getUsers();
    setUsuariosState(nuevosUsuarios);
  };

  const eliminarUsuarioDeLista = async (dni: number) => {
    await deleteUser(dni);
    setUsuariosState((prev) => prev.filter((user) => user.dni_usuario !== dni));
  };

  return {
    usuariosState,
    provinciasState,
    rolesState,
    modificarUsuarioEnLista,
    eliminarUsuarioDeLista,
  };
}