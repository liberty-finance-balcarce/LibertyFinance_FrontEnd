import { useUsuarios } from "../hooks/useUsuarios";
import styles from "../styles/components/AdminUsersCard.module.css"; 

export function AdminUsersCard() {
  const { usuariosState } = useUsuarios();

  const totalRegistrados = usuariosState.length;

  const totalUsuarios = usuariosState.filter(
    (user) => user.rol?.nombre?.toLowerCase() !== "admin"
  ).length;

  const totalAdmins = usuariosState.filter(
    (user) => user.rol?.nombre?.toLowerCase() === "admin"
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.card}> 
        <h2>{totalRegistrados}</h2>
        <p>Usuarios Totales</p>
      </div>

      <div className={styles.card}>
        <h2>{totalUsuarios}</h2>
        <p>Usuarios Registrados</p>
      </div>

      <div className={styles.card}>
        <h2>{totalAdmins}</h2>
        <p>Administradores</p>
      </div>
    </div>
  );
}