import { NavLink } from "react-router-dom";
import styles from "../styles/components/NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.header}>
            <div className={styles.logo}>
                <NavLink to="/"><img src="../assets/logo-complete.png" alt="Logo Liberty Finance" /></NavLink>
            </div>

            <div className={styles.links}>
                <NavLink to="/" className={({ isActive }) => isActive ? `${styles.button} ${styles.buttonActive}` : styles.button}>Home</NavLink>
                <NavLink to="/nuestro-equipo" className={({ isActive }) => isActive ? `${styles.button} ${styles.buttonActive}` : styles.button}>Nuestro Equipo</NavLink>
                <NavLink to="/contactenos" className={({ isActive }) => isActive ? `${styles.button} ${styles.buttonActive}` : styles.button}>Contactenos</NavLink>
            </div>

            <div className={styles.login}>
                <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.buttonLogin} ${styles.buttonLoginActive}` : styles.buttonLogin}>Login</NavLink>
            </div>
        </nav>
    )
}
