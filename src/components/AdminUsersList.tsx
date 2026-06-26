import { useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useUsuarios } from "../hooks/useUsuarios";


import type { Usuario } from "../types/usuarios";
import { ModalEditarUsuario } from "./ModalEditarUsuario";
import { ModalEliminarUsuario } from "./ModalEliminarUsuario";

import { AvatarUsuario } from "./AvatarUsuario";
import styles from "../styles/components/AdminUserList.module.css";

export function AdminUserList() {
  const {
    usuariosState,
    provinciasState,
    rolesState,
    modificarUsuarioEnLista,
    eliminarUsuarioDeLista
  } = useUsuarios();

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

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
              <h3>
                {user.nombre} {user.apellido}
              </h3>
              <p>{user.mail}</p>
            </div>
            <button
              onClick={() => {
                setUsuarioSeleccionado(user);
                setModalEditarAbierto(true);
              }}
            >
              <FaPen />
            </button>
            <button
              onClick={() => {
                setUsuarioAEliminar(user);
                setModalEliminarAbierto(true);
              }}
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
          onSave={(data) =>
            modificarUsuarioEnLista(usuarioSeleccionado.dni_usuario, data).then(
              () => setModalEditarAbierto(false),
            )
          }
        />
      )}

      <ModalEliminarUsuario
        abierto={modalEliminarAbierto}
        usuario={usuarioAEliminar}
        onConfirmar={() =>
          usuarioAEliminar &&
          eliminarUsuarioDeLista(usuarioAEliminar.dni_usuario).then(() =>
            setModalEliminarAbierto(false),
          )
        }
        onClose={() => setModalEliminarAbierto(false)}
      />
    </>
  );
}
