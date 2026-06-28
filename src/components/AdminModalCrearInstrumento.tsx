import { FormCrearInstrumento } from "./AdminFormCrearInstrumento"; // Asegúrate de ajustar la ruta
import type { CreateInstrumentoFinanciero } from "../types/instrumento-financiero";
import type { Instrumento } from "../types/instrumento-financiero";
import styles from "../styles/components/AdminModalCrearInstrumento.module.css";

interface Props {
  abierto: boolean;
  instrumento?: Instrumento | null;
  onClose: () => void;
  onSave: (data: CreateInstrumentoFinanciero) => void;
}

export function AdminModalCrearInstrumento({
  abierto,
  instrumento,
  onClose,
  onSave,
}: Props) {
  if (!abierto) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <FormCrearInstrumento
          instrumento={instrumento}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
