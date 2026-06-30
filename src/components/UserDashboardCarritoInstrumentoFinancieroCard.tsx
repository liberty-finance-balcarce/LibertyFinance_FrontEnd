import { useState } from "react";
import styles from "../styles/components/UserDashboardCarritoInstrumentoFinancieroCard.module.css";
import { type Instrumento, Riesgo } from "../types/instrumento-financiero";
import { useCarrito } from "../hooks/useCarrito";

interface Props {
    instrumentoFinanciero: Instrumento;
}

const riesgoStyles: Record<Riesgo, string> = {
    [Riesgo.BAJO]: styles.riesgoBajo,
    [Riesgo.MEDIO]: styles.riesgoMedio,
    [Riesgo.ALTO]: styles.riesgoAlto,
};

const CANTIDAD_MINIMA = 1;

export function UserDashboardCarritoInstrumentoFinancieroCard({ instrumentoFinanciero }: Props) {
    const {
        id_instrumento,
        nombre_instrumento,
        rendimiento,
        riesgo,
        precio_instrumento,
        tipo_instrumento,
        logo_url,
    } = instrumentoFinanciero;

    const { items, agregarItem, quitarItem, actualizarCantidad } = useCarrito();
    const itemEnCarrito = items.find((i) => i.id_instrumento === id_instrumento);
    const yaEnCarrito = !!itemEnCarrito;

    const [cantidadInicial, setCantidadInicial] = useState(CANTIDAD_MINIMA);

    const handleClick = () => {
        if (yaEnCarrito) {
            quitarItem(id_instrumento);
        } else {
            agregarItem(instrumentoFinanciero, cantidadInicial);
        }
    };

    const handleCambiarCantidad = (nuevaCantidad: number) => {
        if (nuevaCantidad < CANTIDAD_MINIMA) return;

        if (yaEnCarrito) {
            actualizarCantidad(id_instrumento, nuevaCantidad);
        } else {
            setCantidadInicial(nuevaCantidad);
        }
    };

    const cantidadActual = yaEnCarrito ? itemEnCarrito.cantidad : cantidadInicial;

    const precioFormateado = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "USD",
    }).format(precio_instrumento);

    return (
        <div className={styles.card}>
            <img src={logo_url} alt={nombre_instrumento} className={styles.logo} />

            <h3 className={styles.title}>{nombre_instrumento}</h3>

            <span className={styles.tipoBadge}>{tipo_instrumento}</span>

            <div className={styles.info}>
                <p><span>Precio:</span> {precioFormateado}</p>
                <p><span>Rendimiento:</span> {rendimiento}%</p>
                <p>
                    <span>Riesgo:</span>{" "}
                    <strong className={riesgoStyles[riesgo]}>{riesgo}</strong>
                </p>
            </div>

            <div className={styles.cantidadSelector}>
                <label htmlFor={`cantidad-${id_instrumento}`}>Cantidad:</label>
                <input
                    id={`cantidad-${id_instrumento}`}
                    type="number"
                    min={CANTIDAD_MINIMA}
                    value={cantidadActual}
                    onChange={(e) => handleCambiarCantidad(Number(e.target.value))}
                    className={styles.cantidadInput}
                />
            </div>

            <button className={styles.button} onClick={handleClick}>
                {yaEnCarrito ? "Quitar del carrito" : "Agregar al carrito"}
            </button>
        </div>
    );
}