import { useState } from "react";
import Modal from "./Modal";
import { FormularioTest } from "./FormularioTest";
import styles from "../styles/components/TestInversor.module.css";

export function TestInversor() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className={styles.contTestInversor}>
      <h2>¿Querés saber qué tipo de inversor sos?</h2>

      <button
        onClick={() => setModalAbierto(true)}
        className={styles.botonTest}
      >
        TEST
      </button>

      <Modal estaAbierto={modalAbierto} cerrar={() => setModalAbierto(false)}>
        <FormularioTest onClose={() => setModalAbierto(false)} />
      </Modal>
    </div>
  );
}
