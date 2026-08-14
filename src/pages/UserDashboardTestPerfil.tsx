import { Button } from "../components/Button";
import { useState } from "react";
import { FormularioTestResultados } from "../components/FormularioTestResultados";
import { TestInversor } from "../components/TestInversor";
import styles from "../styles/pages/UserDashboardTestPerfil.module.css";

export function UserDashboardTestPerfil() {
 
  const [perfil, setPerfil]=useState<string | null>(()=>{
    return localStorage.getItem("perfilInv");
  });
  console.log(perfil);

const handleTestCompleto = () => {
    setPerfil(localStorage.getItem("perfilInv"));
  };
const handleReiniciar = () => {
    localStorage.removeItem("perfilInv");
    localStorage.removeItem("testInversor");
    setPerfil(null);
  };

  return (
    <div>
      {perfil ? (
        <>
          <div className={styles.container}>
            <FormularioTestResultados />
            <Button
              className={styles.btnReiniciarTest}
              onClick={handleReiniciar}
            >
              Reiniciar Test
            </Button>
          </div>
        </>
      ) : (
        <TestInversor onComplete={handleTestCompleto}/>
      )}
    </div>
  );
}
