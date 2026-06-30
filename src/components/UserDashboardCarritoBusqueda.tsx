import { FaSearch } from "react-icons/fa";
import styles from "../styles/components/UserDashboardCarritoBusqueda.module.css";

interface Props {
    valor: string;
    onCambiar: (valor: string) => void;
    placeholder?: string;
}

export function UserDashboardCarritoBusqueda({
    valor,
    onCambiar,
    placeholder = "Buscar instrumento...",
}: Props) {
    return (
        <div className={styles.buscador}>
            <FaSearch className={styles.icono} />
            <input
                type="text"
                value={valor}
                onChange={(e) => onCambiar(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
                aria-label="Buscar instrumento financiero"
            />
            {valor.length > 0 && (
                <button
                    type="button"
                    className={styles.limpiar}
                    onClick={() => onCambiar("")}
                    aria-label="Limpiar busqueda"
                >
                    ×
                </button>
            )}
        </div>
    );
}