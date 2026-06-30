import { useState } from "react";
import styles from "../styles/components/UserDashboardCarritoModal.module.css";

interface Props {
    cantidadItems: number;
    procesando: boolean;
    errorCompra: string | null;
    onConfirmar: () => void;
    onCerrar: () => void;
}

function validarLuhn(numero: string): boolean {
    const digitos = numero.replace(/\D/g, "");

    if (digitos.length < 13 || digitos.length > 16) return false;

    let suma = 0;
    let esSegundo = false;

    for (let i = digitos.length - 1; i >= 0; i--) {
        let digito = parseInt(digitos[i], 10);

        if (esSegundo) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        suma += digito;
        esSegundo = !esSegundo;
    }

    return suma % 10 === 0;
}

function darFormatoNumeroTarjeta(valor: string): string {
    const digitos = valor.replace(/\D/g, "").slice(0, 16);
    return digitos.replace(/(.{4})/g, "$1 ").trim();
}

export function UserDashboardCarritoModal({
    cantidadItems,
    procesando,
    errorCompra,
    onConfirmar,
    onCerrar,
}: Props) {
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [nombreTitular, setNombreTitular] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    const [tarjetaInvalida, setTarjetaInvalida] = useState(false);

    const handleNumeroChange = (valor: string) => {
        setNumeroTarjeta(darFormatoNumeroTarjeta(valor));
        setTarjetaInvalida(false);
    };

    const handleConfirmarClick = () => {
        if (!validarLuhn(numeroTarjeta)) {
            setTarjetaInvalida(true);
            return;
        }

        onConfirmar();
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={() => !procesando && onCerrar()}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Confirmar pago</h2>
                <p>Vas a invertir en {cantidadItems} instrumento(s).</p>

                <div className={styles.tarjetaForm}>
                    <div className={styles.campoTarjeta}>
                        <label htmlFor="numeroTarjeta">Número de tarjeta</label>
                        <input
                            id="numeroTarjeta"
                            type="text"
                            inputMode="numeric"
                            placeholder="0000 0000 0000 0000"
                            value={numeroTarjeta}
                            onChange={(e) => handleNumeroChange(e.target.value)}
                            disabled={procesando}
                            className={styles.tarjetaInput}
                        />
                    </div>

                    <div className={styles.campoTarjeta}>
                        <label htmlFor="nombreTitular">Titular</label>
                        <input
                            id="nombreTitular"
                            type="text"
                            placeholder="Nombre y apellido"
                            value={nombreTitular}
                            onChange={(e) => setNombreTitular(e.target.value)}
                            disabled={procesando}
                            className={styles.tarjetaInput}
                        />
                    </div>

                    <div className={styles.filaDoble}>
                        <div className={styles.campoTarjeta}>
                            <label htmlFor="vencimiento">Vencimiento</label>
                            <input
                                id="vencimiento"
                                type="text"
                                placeholder="MM/AA"
                                maxLength={5}
                                value={vencimiento}
                                onChange={(e) => setVencimiento(e.target.value)}
                                disabled={procesando}
                                className={styles.tarjetaInput}
                            />
                        </div>

                        <div className={styles.campoTarjeta}>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                id="cvv"
                                type="text"
                                inputMode="numeric"
                                placeholder="123"
                                maxLength={4}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                                disabled={procesando}
                                className={styles.tarjetaInput}
                            />
                        </div>
                    </div>
                </div>

                {tarjetaInvalida && (
                    <p className={styles.error}>El numero de tarjeta no es valido.</p>
                )}

                {errorCompra && <p className={styles.error}>{errorCompra}</p>}

                <div className={styles.botonesContainer}>
                    <button
                        className={styles.botonCerrar}
                        onClick={onCerrar}
                        disabled={procesando}
                    >
                        Cerrar
                    </button>
                    <button
                        className={styles.botonConfirmar}
                        onClick={handleConfirmarClick}
                        disabled={procesando}
                    >
                        {procesando ? "Procesando..." : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    );
}