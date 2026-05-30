import styles from "../styles/components/NavBar.module.css";
import type { Usuario } from "../types/usuarios";

export function AvatarUsuario({ usuario }: { usuario: Usuario }) {

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