import styles from "../styles/components/AdminCardUsers.module.css"

interface UserCardsProps {
  totalRegistrados: number;
  totalUsuarios: number;
  totalAdmins: number;
}

export default function AdminCardUsers({totalRegistrados, totalUsuarios, totalAdmins}: UserCardsProps) {
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