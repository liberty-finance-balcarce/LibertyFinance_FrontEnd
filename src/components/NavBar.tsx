import { useAuth } from "../hooks/useAuth";
import { AvatarUsuario } from "./AvatarUsuario";
import { Button } from "./Button";
import { BsPersonFill } from "react-icons/bs";
import styles from "../styles/components/NavBar.module.css";

export function NavBar() {
  const { role, user } = useAuth();

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Button to="/" variant="logo">
          <img src="../assets/logo-complete.png" alt="Logo Liberty Finance" />
        </Button>
      </div>

      <div className={styles.links}>
        <Button to="/" variant="default">
          Inicio
        </Button>
        <Button to="/sobre-nosotros" variant="default">
          Sobre Nosotros
        </Button>
        <Button to="/contactenos" variant="default">
          Contactenos
        </Button>
      </div>

      <div className={styles.login}>
        {role === "user" ? (
          <div className={styles.usuario}>
            <Button to="/dashboard/user" variant="login">
              <AvatarUsuario usuario={user} />
            </Button>
          </div>
        ) : role === "admin" ? (
          <div className={styles.usuario}>
            <Button to="/dashboard/admin" variant="login">
              <AvatarUsuario usuario={user} />
            </Button>
          </div>
        ) : (
          <Button to="/login" variant="login">
            <BsPersonFill />
          </Button>
        )}
      </div>
    </nav>
  );
}
