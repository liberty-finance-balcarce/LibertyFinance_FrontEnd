import styles from "../styles/components/ModalEditarUsuario.module.css";

import type { Usuario } from "../types/usuarios";

import type { UpdateUsuarioDTO } from "../types/usuario/updateUsuarioDTO";
import { FormEditarUsuario } from "../components/FormEditarUsuario";
import type { Rol } from "../types/rol";
import type { Provincia } from "../types/provincias";

interface Props {
  usuario: Usuario | null;
  roles: Rol[];
  provincias: Provincia[];
  onClose: () => void;
  onSave: (data: UpdateUsuarioDTO) => void;
}

export function ModalEditarUsuario({
  usuario,
  provincias,
  roles,
  onClose,
  onSave,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <FormEditarUsuario
          usuario={usuario}
          provincias={provincias}
          roles={roles}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
