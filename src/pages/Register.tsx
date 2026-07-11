import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Register.module.css";
import { useAuth } from "../hooks/useAuth";
import { useProvincias } from "../hooks/useProvincias";
import { Button } from "../components/Button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type FormData = {
  nombre: string;
  apellido: string;
  mail: string;
  contraseña: string;
  codArea: string;
  telefono: string;
  fecha_nacimiento: string;
  dni: string;
  provincia: string;
  localidad: string;
  perfilInversor: string;
  terminos: boolean;
};

const onlyText = (value: string) =>
  value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

const onlyNumbers = (value: string, max?: number) =>
  value.replace(/\D/g, "").slice(0, max);

const PERFIL_CONSERVADOR = "1";

const getPerfilInversorFromTest = () => {
  const savedProfile = localStorage.getItem("perfilInv");
  if (!savedProfile) return PERFIL_CONSERVADOR;

  try {
    const data = JSON.parse(savedProfile);

    if (!data.finished) return PERFIL_CONSERVADOR;

    const perfil = String(data.perfil ?? "").toUpperCase();

    if (perfil === "MODERADO") return "2";
    if (perfil === "AGRESIVO" || perfil === "EXPERTO") return "3";
    if (perfil === "CONSERVADOR") return PERFIL_CONSERVADOR;

    const score = Number(data.total);
    if (!Number.isFinite(score)) return PERFIL_CONSERVADOR;

    if (score <= 30) return PERFIL_CONSERVADOR;
    if (score <= 60) return "2";
    return "3";
  } catch {
    return PERFIL_CONSERVADOR;
  }
};

export function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { provinciasList } = useProvincias();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      apellido: "",
      mail: "",
      contraseña: "",
      codArea: "",
      telefono: "",
      fecha_nacimiento: "",
      dni: "",
      provincia: "",
      localidad: "",
      perfilInversor: getPerfilInversorFromTest(),
      terminos: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    try {
      const response = await registerUser({
        dni_usuario: Number(data.dni),
        nombre: data.nombre,
        apellido: data.apellido,
        mail: data.mail,
        contraseña: data.contraseña,
        numero_telefono: `${data.codArea}${data.telefono}`,
        direccion: data.localidad,
        id_provincia: Number(data.provincia),
        id_perfilinv: Number(data.perfilInversor || PERFIL_CONSERVADOR),
        id_codigo_referidos: 0,
        fecha_nacimiento: data.fecha_nacimiento,
      });

      if (!response.ok) {
        throw new Error(
          "Ocurrio un error al intentar registrar el usuario. Verifica que el DNI o Email no existan.",
        );
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Registrarse</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.gridContainer}>
          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                placeholder="Juan"
                className={errors.nombre ? styles.inputError : ""}
                {...register("nombre", {
                  required: "El nombre no puede estar vacio.",
                  setValueAs: onlyText,
                })}
              />
              {errors.nombre && (
                <span className={styles.fieldError}>
                  {errors.nombre.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="apellido">Apellido *</label>
              <input
                id="apellido"
                placeholder="Pérez"
                className={errors.apellido ? styles.inputError : ""}
                {...register("apellido", {
                  required: "El apellido no puede estar vacio.",
                  setValueAs: onlyText,
                })}
              />
              {errors.apellido && (
                <span className={styles.fieldError}>
                  {errors.apellido.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mail">Mail *</label>
              <input
                type="email"
                id="mail"
                placeholder="juan.perez@gmail.com"
                className={errors.mail ? styles.inputError : ""}
                {...register("mail", {
                  required: "El mail debe ser valido.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El mail debe ser valido.",
                  },
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.mail && (
                <span className={styles.fieldError}>{errors.mail.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contraseña">Contraseña *</label>

              <div className={styles.contPassword}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="contraseña"
                  placeholder="Adminjk12*"
                  maxLength={16}
                  className={`${styles.contPassword} ${errors.contraseña ? styles.inputError : ""}`}
                  {...register("contraseña", {
                    required: "La contraseña es obligatoria.",
                    minLength: {
                      value: 8,
                      message:
                        "La contraseña no cumple con los requisitos.",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "La contraseña no cumple con los requisitos.",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#*])/,
                      message:
                        "La contraseña no cumple con los requisitos.",
                    },
                  })}
                />

                <button
                
                  type="button"
                  className={styles.botonEye}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  title={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <IoEyeOffOutline />:<IoEyeOutline />}
                </button>
              </div>

              {errors.contraseña && (
                <span className={styles.fieldError}>
                  {errors.contraseña.message}
                </span>
              )}
              <span className={styles.reqPassword}>La contraseña debe tener entre 8 y 16 caracteres, incluir al menos una mayúscula, una minúscula y un carácter especial (# o *).</span>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label>Número de teléfono *</label>

              <div className={styles.phoneGroup}>
                <input
                  placeholder="2266"
                  className={`${styles.codArea} ${
                    errors.codArea ? styles.inputError : ""
                  }`}
                  {...register("codArea", {
                    required: "El codigo de area es obligatorio.",
                    pattern: {
                      value: /^\d+$/,
                      message: "El codigo de area debe contener solo numeros.",
                    },
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    },
                    setValueAs: (value) => onlyNumbers(value, 4),
                  })}
                />

                <input
                  placeholder="456789"
                  className={`${styles.telNumber} ${
                    errors.telefono ? styles.inputError : ""
                  }`}
                  {...register("telefono", {
                    required: "El telefono es obligatorio.",
                    pattern: {
                      value: /^\d+$/,
                      message: "El telefono debe contener solo numeros.",
                    },
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    },
                    setValueAs: (value) => onlyNumbers(value, 10),
                  })}
                />
              </div>

              {errors.codArea && (
                <span className={styles.fieldError}>
                  {errors.codArea.message}
                </span>
              )}
              {errors.telefono && (
                <span className={styles.fieldError}>
                  {errors.telefono.message}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="fecha_nacimiento">Fecha de nacimiento *</label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  className={errors.fecha_nacimiento ? styles.inputError : ""}
                  {...register("fecha_nacimiento", {
                    required: "La fecha de nacimiento no puede estar vacia.",
                    validate: (value) =>
                      new Date(value) <= new Date() ||
                      "La fecha de nacimiento no puede ser mayor a la fecha actual.",
                  })}
                />
                {errors.fecha_nacimiento && (
                  <span className={styles.fieldError}>
                    {errors.fecha_nacimiento.message}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dni">DNI *</label>
                <input
                  id="dni"
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="40123456"
                  className={errors.dni ? styles.inputError : ""}
                  {...register("dni", {
                    required: "El DNI es obligatorio.",
                    pattern: {
                      value: /^\d{7,8}$/,
                      message:
                        "El DNI debe tener entre 7 y 8 numeros, sin puntos.",
                    },
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 8);
                    },
                    setValueAs: (value) => onlyNumbers(value, 8),
                  })}
                />

                {errors.dni && (
                  <span className={styles.fieldError}>
                    {errors.dni.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="provincia">Provincia *</label>
                <select
                  id="provincia"
                  className={errors.provincia ? styles.inputError : ""}
                  {...register("provincia", {
                    required: "Debe seleccionar una provincia valida.",
                    validate: (value) =>
                      Number(value) >= 1 ||
                      "Debe seleccionar una provincia valida.",
                  })}
                >
                  <option value="">Elegí una provincia</option>
                  {provinciasList.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.provincia}
                    </option>
                  ))}
                </select>
                {errors.provincia && (
                  <span className={styles.fieldError}>
                    {errors.provincia.message}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="localidad">Localidad *</label>
                <input
                  id="localidad"
                  placeholder="Balcarce"
                  className={errors.localidad ? styles.inputError : ""}
                  {...register("localidad", {
                    required: "La localidad (direccion) no puede estar vacia.",
                    setValueAs: (value) =>
                      value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, ""),
                  })}
                />
                {errors.localidad && (
                  <span className={styles.fieldError}>
                    {errors.localidad.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <input
          type="hidden"
          {...register("perfilInversor")}
        />
        <span className={styles.hint}>
          * Campos Obligatorios.
        </span>

        <div className={styles.termsGroup}>
          <input
            type="checkbox"
            id="terminos"
            {...register("terminos", {
              required:
                "Debes aceptar los Terminos y Condiciones y el Descargo de responsabilidad para continuar.",
            })}
          />

          <label htmlFor="terminos">
            He leído y acepto los{" "}
            <a href="/terminos-y-condiciones" className={styles.link}>
              Términos y Condiciones
            </a>{" "}
            y el{" "}
            <a href="/descargo-de-responsabilidad" className={styles.link}>
              Descargo de responsabilidad
            </a>
          </label>
        </div>

        {errors.terminos && (
          <span className={styles.termsError}>{errors.terminos.message}</span>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button
            type="button"
            className={styles.btnVolver}
            onClick={() => navigate(-1)}
          >
            VOLVER
          </Button>

          <Button
            type="submit"
            className={styles.btnSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "CREANDO..." : "CREAR CUENTA"}
          </Button>
        </div>
      </form>
    </main>
  );
}
