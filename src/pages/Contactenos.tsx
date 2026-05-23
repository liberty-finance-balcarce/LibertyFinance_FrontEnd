import { useState } from "react";
import styles from "../styles/pages/Contactenos.module.css";
import { useContactForm } from "../hooks/useContactForm";

export function Contactenos() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const { sendForm, isLoading, error, isSuccess } = useContactForm();

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "nombre":
        if (!value.trim()) {
          errorMessage = "El nombre es obligatorio.";
        } else if (value.trim().length < 2) {
          errorMessage = "El nombre debe tener al menos 2 caracteres.";
        }
        break;
      case "apellido":
        if (!value.trim()) {
          errorMessage = "El apellido es obligatorio.";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "El email es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Ingresa un email válido (ej: usuario@correo.com).";
        }
        break;
      case "telefono":
        if (value.trim() && !/^[0-9+\-\s()]+$/.test(value)) {
          errorMessage =
            "El teléfono solo debe contener números y símbolos (+, -, ()).";
        }
        break;
      case "asunto":
        if (value.trim().length > 100) {
          errorMessage = "El asunto no puede superar los 100 caracteres.";
        }
        break;
      case "mensaje":
        if (!value.trim()) {
          errorMessage = "Por favor, escribe un mensaje.";
        } else if (value.trim().length < 10) {
          errorMessage = "El mensaje debe tener al menos 10 caracteres.";
        } else if (value.trim().length > 500) {
          errorMessage = "El mensaje no puede superar los 500 caracteres.";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const currentError = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: currentError,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrors = {
      nombre: validateField("nombre", formData.nombre),
      apellido: validateField("apellido", formData.apellido),
      email: validateField("email", formData.email),
      telefono: validateField("telefono", formData.telefono),
      asunto: validateField("asunto", formData.asunto),
      mensaje: validateField("mensaje", formData.mensaje),
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (errorMsg) => errorMsg !== "",
    );

    if (!hasErrors) {
      await sendForm(formData);
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contáctenos</h1>
        <p className={styles.subtitle}>
          <a href="#">Ponte en Contacto con nosotros</a>
        </p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="(Obligatorio)"
              className={formErrors.nombre ? styles.inputError : ""}
            />
            {formErrors.nombre && (
              <span className={styles.error}>{formErrors.nombre}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="(Obligatorio)"
              className={formErrors.apellido ? styles.inputError : ""}
            />
            {formErrors.apellido && (
              <span className={styles.error}>{formErrors.apellido}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="(Obligatorio)"
              className={formErrors.email ? styles.inputError : ""}
            />
            {formErrors.email && (
              <span className={styles.error}>{formErrors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={formErrors.telefono ? styles.inputError : ""}
            />
            {formErrors.telefono && (
              <span className={styles.error}>{formErrors.telefono}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="asunto">Asunto</label>
            <span className={styles.charCount}>
              {formData.asunto.length}/100
            </span>
          </div>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            maxLength={100}
            className={formErrors.asunto ? styles.inputError : ""}
          />
          {formErrors.asunto && (
            <span className={styles.error}>{formErrors.asunto}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="mensaje">Mensaje</label>
            <span className={styles.charCount}>
              {formData.mensaje.length}/500
            </span>
          </div>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            className={formErrors.mensaje ? styles.inputError : ""}
          />
          {formErrors.mensaje && (
            <span className={styles.error}>{formErrors.mensaje}</span>
          )}
        </div>

        {error && (
          <p className={`${styles.statusMessage} ${styles.statusError}`}>
            Error al enviar: {error}
          </p>
        )}
        {isSuccess && (
          <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>
            ¡El mensaje se ha enviado correctamente!
          </p>
        )}

        <button
          type="submit"
          className={`${styles.submitButton} ${isLoading ? styles.buttonLoading : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
