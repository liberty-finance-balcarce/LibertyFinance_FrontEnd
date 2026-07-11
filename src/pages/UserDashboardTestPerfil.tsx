import { Button } from "../components/Button";
import { FormularioTest } from "../components/FormularioTest";
import { TestInversor } from "../components/TestInversor";
import styles from "../styles/pages/UserDashboardTestPerfil.module.css";

export function UserDashboardTestPerfil() {
  const perfil = localStorage.getItem("perfilInv");

  return (
    <div>
      {perfil ? (
        <>
          <div className={styles.container}>
            <FormularioTest />
            <Button
              className={styles.btnReiniciarTest}
              onClick={() => localStorage.removeItem("perfilInv")}
            >
              Reiniciar Test
            </Button>
          </div>
        </>
      ) : (
        <TestInversor />
      )}
    </div>
  );
}
