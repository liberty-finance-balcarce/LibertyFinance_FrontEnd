import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import styles from "../styles/components/NavBar.module.css";

export function AdminNavBar() {
  const { user } = useAuth();

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Button to="/" variant="logo">
          <img src="../assets/logo-complete.png" alt="Logo Liberty Finance" />
        </Button>
      </div>

      <div className={styles.titulo}>
        <h1>Bienvenido, {user?.nombre} {user?.apellido}</h1>
      </div>

    </nav>
  );
}