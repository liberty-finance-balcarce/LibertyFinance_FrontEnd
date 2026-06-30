import type { Usuario } from "../types/usuarios";
import styles from "../styles/components/AdminModalEliminarUsuario.module.css";
import { Button } from "./Button";

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
          <Button className={styles.cancel} onClick={onClose}>
            Cancelar
          </Button>

          <Button className={styles.delete} onClick={onConfirmar}>
            Sí, eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
