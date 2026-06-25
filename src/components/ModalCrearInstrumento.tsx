import { FormCrearInstrumento } from "./FormCrearInstrumento"; // Asegúrate de ajustar la ruta
import type { createInstrumentoFinancieroDTO } from "../types/Dto/createInstumentoFinancieroDTO";
import type { Instrumento } from "../types/instrumento-financiero";
import styles from "../styles/components/ModalCrearInstrumento.module.css"

interface Props {
  abierto: boolean;
  instrumento?: Instrumento | null;
  onClose: () => void;
  onSave: (data: createInstrumentoFinancieroDTO) => void;
}

export function ModalCrearInstrumento({abierto, instrumento, onClose, onSave}: Props) {
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