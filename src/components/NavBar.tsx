import styles from "../styles/components/NavBar.module.css";
import { Button } from "./Button";

export function NavBar() {
  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Button to="/" variant="logo">
          <img src="../assets/logo-complete.png" alt="Logo Liberty Finance" />
        </Button>
      </div>

      <div className={styles.links}>
        <Button to="/" variant="default">Home</Button>
        <Button to="/nuestro-equipo" variant="default">Nuestro Equipo</Button>
        <Button to="/contactenos" variant="default">Contactenos</Button>
      </div>

      <div className={styles.login}>
        <Button to="/login" variant="login">Login</Button>
      </div>
    </nav>
  );
}
