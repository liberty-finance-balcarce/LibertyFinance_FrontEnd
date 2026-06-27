import { useState } from "react";
import styles from "../styles/components/NavBar.module.css";
import type { Usuario } from "../types/usuarios";

export function AvatarUsuario({ usuario }: { usuario: Usuario }) {
  const [imageError, setImageError] = useState(false);

  const iniciales =
    `${usuario.nombre?.[0] ?? ""}${usuario.apellido?.[0] ?? ""}`.toUpperCase();

  if (usuario.foto_perfil && !imageError) {
    return (
      <img
        src={usuario.foto_perfil}
        alt="Imagen de perfil"
        className={styles.avatarImage}
        onError={() => setImageError(true)}
      />
    );
  }
  return <div className={styles.avatarImage}>{iniciales}</div>;
}
