import React, { type ReactNode } from "react";
import styles from "../styles/components/Modal.module.css";

interface ModalProps {
  estaAbierto: boolean;
  cerrar: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ estaAbierto, cerrar, children }) => {
  if (!estaAbierto) return null;

  return (
    <div className={styles.capaFondo} onClick={cerrar}>
      <div className={styles.contModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.contBotonX}>
          <button onClick={cerrar} className={styles.botonCerrarX}>
            ✕
          </button>
        </div>
        <div className={styles.contTextoModal}>{children}</div>
        <div className={styles.contBotonCerrar}>
          <button onClick={cerrar} className={styles.botonCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
