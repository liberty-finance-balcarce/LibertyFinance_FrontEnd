import type { Usuario } from "../types/usuarios";
import { AvatarUsuario } from "./AvatarUsuario";
import styles from "../styles/components/AdminUserList.module.css";

export function AdminUserList({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className={styles.list}>
      {usuarios.map((user) => (
        <div key={user.dni_usuario} className={styles.item}>
          <div
            className={`${styles.avatar} 
              ${
                user.rol.nombre.toLowerCase() === "admin"
                  ? styles.adminAvatar
                  : styles.userAvatar
              }`}
          >
            <AvatarUsuario usuario={user} />
          </div>
          <div className={styles.userInfo}>
            <h3>{user.nombre}</h3>
            <p>{user.mail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}