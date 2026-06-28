import type { Usuario } from "../types/usuarios";
import styles from "../styles/components/AdminModalEliminarUsuario.module.css";

interface Props {
  abierto: boolean;
  usuario: Usuario | null;
  onConfirmar: () => void;
  onClose: () => void;
}

export function AdminModalEliminarUsuario({
  abierto,
  usuario,
  onConfirmar,
  onClose,
}: Props) {
  if (!abierto || !usuario) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>¿Desea eliminar el usuario?</h3>

        <p className={styles.nombre}>
          {usuario.nombre} {usuario.apellido}
        </p>

        <div className={styles.boton}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>

          <button className={styles.delete} onClick={onConfirmar}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
