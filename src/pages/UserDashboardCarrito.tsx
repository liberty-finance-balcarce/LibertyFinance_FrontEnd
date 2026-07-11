import { useMemo, useState } from "react";
import { FaCreditCard, FaShoppingCart, FaTrash } from "react-icons/fa";
import { UserDashboardCarritoInstrumentoFinancieroCard } from "../components/UserDashboardCarritoInstrumentoFinancieroCard";
import { UserDashboardCarritoModal } from "../components/UserDashboardCarritoModal";
import { UserDashboardCarritoBusqueda } from "../components/UserDashboardCarritoBusqueda";
import { useInstrumentosFinancieros } from "../hooks/useInstrumentosFinancieros";
import { useCarrito } from "../hooks/useCarrito";
import { useAuth } from "../hooks/useAuth";
import { useTransaccionHistoricoCompra } from "../hooks/useTransaccionHistoricoCompra";
import type { CreateTransaccionHistoricoCompra } from "../types/transaccion-historico-compra";
import styles from "../styles/pages/UserDashboardCarrito.module.css";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Button } from "../components/Button";

export function UserDashboardCarrito() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useInstrumentosFinancieros();
  const { items, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const { createTransaccionHistoricoCompra } = useTransaccionHistoricoCompra();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [errorCompra, setErrorCompra] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const normalizar = (texto: string) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filtrar = (lista: typeof data.tradicionales | undefined) => {
    if (!lista) return [];
    const termino = normalizar(busqueda.trim());
    if (!termino) return lista;
    return lista.filter(
      (instrumento) =>
        normalizar(instrumento.nombre_instrumento).includes(termino) ||
        normalizar(instrumento.tipo_instrumento).includes(termino),
    );
  };

  const tradicionalesFiltrados = useMemo(
    () => filtrar(data?.tradicionales),
    [data?.tradicionales, busqueda],
  );

  const noTradicionalesFiltrados = useMemo(
    () => filtrar(data?.noTradicionales),
    [data?.noTradicionales, busqueda],
  );

  const handlePayment = async () => {
    setProcesando(true);
    setErrorCompra(null);

    // Utilizamos el formato suecia porque nosotros usamos el AÑO-MES-DIA
    const fechaOperacion = new Date().toLocaleDateString("sv-SE");

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
        err instanceof Error ? err.message : "Error al procesar la compra",
      );
    }
    setProcesando(false);
    navigate("/dashboard/user/inversiones");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <FaShoppingCart className={styles.cartIcon} />

        {items.length > 0 && (
          <div className={styles.accionesCarrito}>
            <Button className={styles.vaciarButton} onClick={vaciarCarrito}>
              <FaTrash className={styles.vaciarIcono} />
              Vaciar
            </Button>

            <Button
              className={styles.comprarButton}
              onClick={() => setModalAbierto(true)}
            >
              <FaCreditCard className={styles.comprarIcono} />
              Comprar ({items.length})
            </Button>
          </div>
        )}
      </div>

      <UserDashboardCarritoBusqueda valor={busqueda} onCambiar={setBusqueda} />

      {isLoading && <LoadingSpinner logo="/assets/logo-icon.png" size={120} />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading &&
        !error &&
        tradicionalesFiltrados.length === 0 &&
        noTradicionalesFiltrados.length === 0 && (
          <p>No se encontraron instrumentos para "{busqueda}"</p>
        )}

      <div className={styles.cardsGrid}>
        {tradicionalesFiltrados.map((instrumento) => (
          <UserDashboardCarritoInstrumentoFinancieroCard
            key={instrumento.id_instrumento}
            instrumentoFinanciero={instrumento}
          />
        ))}
        {noTradicionalesFiltrados.map((instrumento) => (
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
