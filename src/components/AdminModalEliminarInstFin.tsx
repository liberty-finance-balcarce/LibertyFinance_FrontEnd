import type { Instrumento } from "../types/instrumento-financiero";
import { Button } from "./Button";
import styles from "../styles/components/AdminModalEliminarInstFin.module.css";

interface Props {
  abierto: boolean;
  instrumento: Instrumento | null;
  onConfirmar: () => void;
  onClose: () => void;
}

export function AdminModalEliminarInstFin({
  abierto,
  instrumento,
  onConfirmar,
  onClose,
}: Props) {
  if (!abierto || !instrumento) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>¿Desea eliminar el instrumento?</h3>

        <p className={styles.nombre}>{instrumento.nombre_instrumento}</p>

        <div className={styles.boton}>
          <Button className={styles.cancel} onClick={onClose}>
            Cancelar
          </Button>

          <Button className={styles.delete} onClick={onConfirmar}>
            Si, eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
