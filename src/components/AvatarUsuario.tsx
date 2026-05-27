import styles from "../styles/components/NavBarUsuarioRegistrado.module.css";
import type { User } from "../context/AuthContext";

export function AvatarUsuario({ usuario }: { usuario: User }) {

    const iniciales = `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();

    if(usuario.imagen) {
        return (
            <img
            src={usuario.imagen}
            alt="Imagen de perfil"
            className={styles.usuario}
            />
        );
        
    }
        return (
            <div className={styles.usuario}>
                {iniciales}
            </div>
        )
}