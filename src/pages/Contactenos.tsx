import { useForm } from "react-hook-form";
import styles from "../styles/pages/Contactenos.module.css";
import { useContactForm } from "../hooks/useContactForm";
import { Button } from "../components/Button";

interface ContactFormValues {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export function Contactenos() {
  const { sendForm, isLoading, error, isSuccess } = useContactForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    },
  });

  const asunto = watch("asunto") ?? "";
  const mensaje = watch("mensaje") ?? "";

  const onSubmit = async (formData: ContactFormValues) => {
    await sendForm(formData);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contáctenos</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">
              Nombre <span className={styles.required}>*</span>
            </label>

            <input
              type="text"
              id="nombre"
              minLength={2}
              maxLength={20}
              placeholder="Juan"
              className={errors.nombre ? styles.inputError : ""}
              {...register("nombre", {
                required: "El nombre es obligatorio.",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "El nombre debe tener maximo 20 caracteres.",
                },
                setValueAs: (value) => value.trim(),
              })}
            />

            {errors.nombre && (
              <span className={styles.error}>{errors.nombre.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="apellido">
              Apellido <span className={styles.required}>*</span>
            </label>

            <input
              type="text"
              id="apellido"
              minLength={2}
              maxLength={20}
              placeholder="Perez"
              className={errors.apellido ? styles.inputError : ""}
              {...register("apellido", {
                required: "El apellido es obligatorio.",
                setValueAs: (value) => value.trim(),
                minLength: {
                  value: 2,
                  message: "El apellido debe tener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "El apellido debe tener maximo 20 caracteres.",
                },
              })}
            />

            {errors.apellido && (
              <span className={styles.error}>{errors.apellido.message}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              Email <span className={styles.required}>*</span>
            </label>

            <input
              type="email"
              id="email"
              placeholder="juan.perez@gmail.com"
              className={errors.email ? styles.inputError : ""}
              {...register("email", {
                required: "El email es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un email valido (ej: usuario@correo.com).",
                },
                setValueAs: (value) => value.trim(),
              })}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefono">Telefono</label>

            <input
              type="tel"
              id="telefono"
              placeholder="+542266630218"
              maxLength={40}
              className={errors.telefono ? styles.inputError : ""}
              {...register("telefono", {
                setValueAs: (value) => value.trim(),

                validate: (value) => {
                  if (!value) return true;

                  const phone = value.trim();

                  const validChars = /^[0-9+\-\s()]+$/.test(phone);

                  if (!validChars) {
                    return "El telefono solo debe contener numeros y simbolos (+, -, ()).";
                  }

                  const soloNumeros = phone.replace(/\D/g, "");

                  if (soloNumeros.length < 8) {
                    return "El telefono debe tener al menos 8 numeros.";
                  }

                  if (soloNumeros.length > 15) {
                    return "El telefono no puede tener más de 15 numeros.";
                  }

                  const validFormat = /^\+?[0-9][0-9\s()\-]*[0-9]$/.test(phone);

                  if (!validFormat) {
                    return "Ingresa un telefono valido.";
                  }

                  return true;
                },
              })}
            />

            {errors.telefono && (
              <span className={styles.error}>{errors.telefono.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="asunto">
              Asunto <span className={styles.required}>*</span>
            </label>

            <span className={styles.charCount}>{asunto.length}/100</span>
          </div>

          <input
            type="text"
            id="asunto"
            placeholder="Consulta sobre instrumentos financieros"
            maxLength={100}
            className={errors.asunto ? styles.inputError : ""}
            {...register("asunto", {
              required: "El asunto es obligatorio.",
              maxLength: {
                value: 100,
                message: "El asunto no puede superar los 100 caracteres.",
              },
              setValueAs: (value) => value.trim(),
            })}
          />

          {errors.asunto && (
            <span className={styles.error}>{errors.asunto.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="mensaje">
              Mensaje <span className={styles.required}>*</span>
            </label>

            <span className={styles.charCount}>{mensaje.length}/500</span>
          </div>

          <textarea
            id="mensaje"
            placeholder="Quiero recibir mas informacion sobre las inversiones disponibles"
            rows={2}
            maxLength={500}
            className={errors.mensaje ? styles.inputError : ""}
            {...register("mensaje", {
              required: "El mensaje es obligatorio.",
              minLength: {
                value: 10,
                message: "El mensaje debe tener al menos 10 caracteres.",
              },
              maxLength: {
                value: 500,
                message: "El mensaje no puede superar los 500 caracteres.",
              },
              setValueAs: (value) => value.trim(),
            })}
          />

          {errors.mensaje && (
            <span className={styles.error}>{errors.mensaje.message}</span>
          )}
        </div>

        <span className={styles.hint}>
          * Campos Obligatorios.
        </span>
        
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

        <Button
          type="submit"
          className={`${styles.submitButton} ${
            isLoading ? styles.buttonLoading : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </section>
  );
}
