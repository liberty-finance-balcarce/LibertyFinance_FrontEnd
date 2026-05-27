import { useAuth } from "../hooks/useAuth";
import styles from "../styles/components/NavBar.module.css";
import { AvatarUsuario } from "./AvatarUsuario";
import { Button } from "./Button";

export function NavBar() {
  const { user } = useAuth();

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Button to="/" variant="logo">
          <img src="../assets/logo-complete.png" alt="Logo Liberty Finance" />
        </Button>
      </div>

      <div className={styles.links}>
        <Button to="/" variant="default">
          Home
        </Button>
        <Button to="/nuestro-equipo" variant="default">
          Nuestro Equipo
        </Button>
        <Button to="/contactenos" variant="default">
          Contactenos
        </Button>
      </div>

      <div className={styles.login}>
        {user ? (
          <Button to="/dashboard" variant="default">
            <AvatarUsuario usuario={user} />
          </Button>
        ) : (
          <Button to="/login" variant="login">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
