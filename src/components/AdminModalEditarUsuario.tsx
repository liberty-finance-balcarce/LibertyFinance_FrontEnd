import styles from "../styles/components/AdminModalEditarUsuario.module.css";
import type { Usuario } from "../types/usuarios";
import type { Rol } from "../types/rol";
import type { Provincia } from "../types/provincias";
import type { UpdateUsuario } from "../types/usuarios";
import { AdminFormEditarUsuario } from "./AdminFormEditarUsuario";

interface Props {
  usuario: Usuario | null;
  roles: Rol[];
  provincias: Provincia[];
  onClose: () => void;
  onSave: (data: UpdateUsuario) => void;
}

export function AdminModalEditarUsuario({
  usuario,
  provincias,
  roles,
  onClose,
  onSave,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <AdminFormEditarUsuario
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
