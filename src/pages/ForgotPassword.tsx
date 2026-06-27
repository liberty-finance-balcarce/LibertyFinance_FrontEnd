import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/pages/ForgotPassword.module.css";

export default function ForgotPassword() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    if (contador <= 0) return;

    const intervalo = setInterval(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [contador]);

  const enviarEnlace = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí irá tu petición al backend

    setContador(59);
  };

  return (
    <section className={styles.containerForgotPassword}>
      <h1 className={styles.title}>Olvidé mi contraseña</h1>

      <p className={styles.subtitle}>
        Ingresá tu DNI y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form className={styles.formForgotPassword} onSubmit={enviarEnlace}>
        <label htmlFor="dni_usuario" className={styles.label}>
          DNI
        </label>

        <input
          id="dni_usuario"
          maxLength={8}
          type="num"
          inputMode="numeric"
          placeholder="Ingresá tu DNI"
          className={styles.inputForgotPassword}
        />

        <button
          type="submit"
          disabled={contador > 0}
          className={styles.buttonForgotPassword}
        >
          Enviar enlace
        </button>

        {contador > 0 && (
          <p className={styles.reenviar}>
            Reenviar mensaje en {contador} segundos
          </p>
        )}

        <div className={styles.contRegistro}>
          <span>
            <NavLink to="/login">Volver</NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}
