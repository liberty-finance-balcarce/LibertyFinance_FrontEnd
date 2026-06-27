import type { Instrumento } from "../types/instrumento-financiero";
import { FormEditarInstrumento, type UpdateInstrumentoDTO } from "../components/FormEditarInsFin";
import styles from "../styles/components/ModalEditarInstFin.module.css";

interface Props {
  instrumento: Instrumento | null;
  onClose: () => void;
  onSave: (data: UpdateInstrumentoDTO) => void;
}

export function ModalEditarInstrumento({ instrumento, onClose, onSave }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <FormEditarInstrumento
          instrumento={instrumento}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}