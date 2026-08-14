import { useState } from "react";
import Modal from "./Modal";
import { FormularioTest } from "./FormularioTest";
import styles from "../styles/components/TestInversor.module.css";
import { Button } from "./Button";

interface TestInversorProps{
  onComplete?:()=> void;
}

export function TestInversor({onComplete}:TestInversorProps) {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className={styles.contTestInversor}>
      <h2>¿Querés saber qué tipo de inversor sos?</h2>

      <Button onClick={() => setModalAbierto(true)} variant="test">
        TEST
      </Button>

      <Modal estaAbierto={modalAbierto} cerrar={() => setModalAbierto(false)}>
        <FormularioTest 
            onClose={() => setModalAbierto(false)} 
            onComplete={onComplete}
          />
      </Modal>
    </div>
  );
}
