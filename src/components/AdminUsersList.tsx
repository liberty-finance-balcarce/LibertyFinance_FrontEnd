import { useEffect, useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

import { deleteUser, updateUser, getUsers } from "../services/usuarios";

import type { Usuario } from "../types/usuarios";

import { ModalEditarUsuario } from "./ModalEditarUsuario";
import { ModalEliminarUsuario } from "./ModalEliminarUsuario";
 
import { AvatarUsuario } from "./AvatarUsuario";
import styles from "../styles/components/AdminUserList.module.css";
import type { Provincia } from "../types/provincias";
import type { Rol } from "../types/rol";

import { fetchProvincias } from "../services/provincias";
import { getRoles } from "../services/usuarios";

type Props = {
  usuarios: Usuario[];
};

export function AdminUserList({ usuarios }: Props) {
  const [usuariosState, setUsuariosState] = useState<Usuario[]>([]);
  const [provinciasState, setProvinciasState] = useState<Provincia[]>([]);
  const [rolesState, setRolesState] = useState<Rol[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);

  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  useEffect(() => {
    if (usuarios.length > 0) {
      setUsuariosState(usuarios);
    }
  }, [usuarios]);

  useEffect(() => {
    const cargarDesplegables = async () => {
      try {
        const [listaProvincias, listaRoles] = await Promise.all([
          fetchProvincias(),
          getRoles(),
        ]);

        setProvinciasState(listaProvincias.data);
        setRolesState(listaRoles);
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };

    cargarDesplegables();
  }, []);

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalEditarAbierto(true);
  };

  const guardarCambios = async (data: any) => {
    if (!usuarioSeleccionado) return;

    try {
      await updateUser(usuarioSeleccionado.dni_usuario, data);

      setUsuariosState((usuariosActuales) =>
        usuariosActuales.map((user) =>
          user.dni_usuario === usuarioSeleccionado.dni_usuario
            ? { ...user, ...data }
            : user,
        ),
      );

      setModalEditarAbierto(false);
      setUsuarioSeleccionado(null);

      const nuevosUsuarios = await getUsers();
      setUsuariosState(nuevosUsuarios);
    } catch (error) {
      console.error("Ocurrio un error al guardar los cambios", error)
      setModalEditarAbierto(false);
      setUsuarioSeleccionado(null);
    }
  };

  const abrirEliminar = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario);
    setModalEliminarAbierto(true);
  };

  const confirmarEliminar = async () => {
    if (!usuarioAEliminar) return;

    await deleteUser(usuarioAEliminar.dni_usuario);
    setUsuariosState((prev) =>
      prev.filter((user) => user.dni_usuario !== usuarioAEliminar.dni_usuario),
    );

    setModalEliminarAbierto(false);
    setUsuarioAEliminar(null);
  };

  return (
    <>
      <div className={styles.list}>
        {usuariosState.map((user) => (
          <div key={user.dni_usuario} className={styles.item}>
            <div
              className={`${styles.avatar} ${
                user.rol?.nombre?.toLowerCase() === "admin"
                  ? styles.adminAvatar
                  : styles.userAvatar
              }`}
            >
              <AvatarUsuario usuario={user} />
            </div>
            <div className={styles.userInfo}>
              <h3>{user.nombre} {user.apellido}</h3>
              <p>{user.mail}</p>
            </div>

            <button
              type="button"
              onClick={() => editarUsuario(user)}
              className={styles.icono}
            >
              <FaPen />
            </button>
            <button
              onClick={() => abrirEliminar(user)}
              className={styles.icono}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {modalEditarAbierto && usuarioSeleccionado && (
        <ModalEditarUsuario
          usuario={usuarioSeleccionado}
          provincias={provinciasState}
          roles={rolesState}
          onClose={() => {
            setModalEditarAbierto(false);
            setUsuarioSeleccionado(null);
          }}
          onSave={guardarCambios}
        />
      )}

      <ModalEliminarUsuario
        abierto={modalEliminarAbierto}
        usuario={usuarioAEliminar}
        onConfirmar={confirmarEliminar}
        onClose={() => {
          setModalEliminarAbierto(false);
          setUsuarioAEliminar(null);
        }}
      />
    </>
  );
}
