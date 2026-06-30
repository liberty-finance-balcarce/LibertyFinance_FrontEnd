import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { UserDashboardCarritoInstrumentoFinancieroCard } from "../components/UserDashboardCarritoInstrumentoFinancieroCard";
import { UserDashboardCarritoModal } from "../components/UserDashboardCarritoModal";
import { useInstrumentosFinancieros } from "../hooks/useInstrumentosFinancieros";
import { useCarrito } from "../hooks/useCarrito";
import { useAuth } from "../hooks/useAuth";
import { useTransaccionHistoricoCompra } from "../hooks/useTransaccionHistoricoCompra";
import type { CreateTransaccionHistoricoCompra } from "../types/transaccion-historico-compra";
import styles from "../styles/pages/UserDashboardCarrito.module.css";
import { useNavigate } from "react-router-dom";

export function UserDashboardCarrito() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useInstrumentosFinancieros();
  const { items, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const { createTransaccionHistoricoCompra } = useTransaccionHistoricoCompra();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [errorCompra, setErrorCompra] = useState<string | null>(null);


  const handlePayment = async () => {
    setProcesando(true);
    setErrorCompra(null);

    const fechaOperacion = new Date().toISOString().split("T")[0];

    try {
      for (const item of items) {
        const dto: CreateTransaccionHistoricoCompra = {
          fecha_operacion: fechaOperacion,
          id_instrumento: Number(item.id_instrumento),
          precio_instrumento: Number(item.precio_instrumento),
          cantidad_paquetes: Number(item.cantidad),
          precio_paquete: Number(item.precio_instrumento),
          dni_usuario: user.dni_usuario,
          cantidad_instrumento_comprado: Number(item.cantidad),
        };

        await createTransaccionHistoricoCompra(dto);
      }

      vaciarCarrito();
      setModalAbierto(false);
    } catch (err) {
      setErrorCompra(
        err instanceof Error ? err.message : "Error al procesar la compra"
      );
    }
    setProcesando(false);
    navigate("/dashboard/user/inversiones")
  };

  return (
    <div className={styles.dashboard}>

      <div className={styles.header}>
        <FaShoppingCart className={styles.cartIcon} />

        {items.length > 0 && (
          <button
            className={styles.comprarButton}
            onClick={() => setModalAbierto(true)}
          >
            Comprar ({items.length})
          </button>
        )}
      </div>

      {isLoading && <p>Cargando instrumentos...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.cardsGrid}>
        {data?.tradicionales.map((instrumento) => (
          <UserDashboardCarritoInstrumentoFinancieroCard
            key={instrumento.id_instrumento}
            instrumentoFinanciero={instrumento}
          />
        ))}
        {data?.noTradicionales.map((instrumento) => (
          <UserDashboardCarritoInstrumentoFinancieroCard
            key={instrumento.id_instrumento}
            instrumentoFinanciero={instrumento}
          />
        ))}
      </div>

      {modalAbierto && (
        <UserDashboardCarritoModal
          cantidadItems={items.length}
          procesando={procesando}
          errorCompra={errorCompra}
          onConfirmar={handlePayment}
          onCerrar={() => setModalAbierto(false)}
        />
      )}

    </div>
  );
}