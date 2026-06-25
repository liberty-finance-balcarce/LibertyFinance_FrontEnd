import type { Usuario } from "../types/usuarios";
import styles from "../styles/components/ModalEliminarUsuario.module.css"

interface Props {
  abierto: boolean;
  usuario: Usuario | null;
  onConfirmar: () => void;
  onClose: () => void;
}

export function ModalEliminarUsuario({abierto, usuario, onConfirmar, onClose}: Props) {
  if (!abierto || !usuario) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>

        <h3 className={styles.titulo}>
          ¿Desea eliminar el usuario?
        </h3>

        <p className={styles.nombre}>
          {usuario.nombre} {usuario.apellido}
        </p>

        <div className={styles.boton}>
          <button
            className={styles.delete}
            onClick={onConfirmar}
          >
            Sí, eliminar
          </button>

          <button
            className={styles.cancel}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}