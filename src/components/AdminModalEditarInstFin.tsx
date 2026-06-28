import type { Instrumento } from "../types/instrumento-financiero";
import { AdminFormEditarInstrumento } from "./AdminFormEditarInsFin";
import type { UpdateInstrumentoFinanciero } from "../types/instrumento-financiero";
import styles from "../styles/components/AdminModalEditarInstFin.module.css";

interface Props {
  instrumento: Instrumento | null;
  onClose: () => void;
  onSave: (data: UpdateInstrumentoFinanciero) => void;
}

export function AdminModalEditarInstrumento({
  instrumento,
  onClose,
  onSave,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <AdminFormEditarInstrumento
          instrumento={instrumento}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
