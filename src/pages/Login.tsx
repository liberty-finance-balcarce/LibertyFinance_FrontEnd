import { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/pages/Login.module.css";
import { useAuth } from "../hooks/useAuth";

interface DatosRecibidos {
  dni_usuario: string;
  password: string;
}

type ValidationErrors = Partial<Record<keyof DatosRecibidos, string>>;

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<DatosRecibidos>({
    dni_usuario: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof DatosRecibidos, boolean>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: keyof DatosRecibidos, value: string): string => {
    if (!value.trim()) {
      return `Debe ingresar ${name === "dni_usuario" ? "DNI" : "contraseña"}.`;
    }

    if (name === "dni_usuario") {
      if (!/^[0-9]+$/.test(value)) return "Solo se permiten números";
      if (value.length < 7) return "Deben ser mínimo 7 números";
      if (value.length > 8) return "Deben ser máximo 8 números";
    }

    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof DatosRecibidos;

    let newValue = value;

    if (fieldName === "dni_usuario") {
      newValue = newValue.replace(/[^0-9]/g, "").slice(0, 8);
    }

    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));

    if (touched[fieldName]) {
      const errorMsg = validateField(fieldName, newValue);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof DatosRecibidos;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const newErrors: ValidationErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof DatosRecibidos>).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ dni_usuario: true, password: true });

    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await login(
        Number(formData.dni_usuario),
        formData.password,
      );

      if (!response.ok) {
        throw new Error("DNI o contraseña incorrectos.");
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.containerLogin}>
      <h1 className={styles.h1}>Iniciar sesión</h1>
      <form className={styles.formLogin} onSubmit={handleSubmit} noValidate>
        <label htmlFor="dni_usuario" className={styles.etiquetaForm}>
          DNI
        </label>
        <input
          className={styles.inputForm}
          id="dni_usuario"
          name="dni_usuario"
          maxLength={8}
          autoComplete="off"
          type="text"
          value={formData.dni_usuario}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingresa tu DNI"
        />
        <span className={styles.errorLogin}>{errors.dni_usuario || ""}</span>

        <label htmlFor="password" className={styles.etiquetaForm}>
          Contraseña
        </label>
        <input
          className={styles.inputForm}
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="********"
        />
        <span className={styles.errorLogin}>{errors.password || ""}</span>

        {error && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className={styles.botonLogin}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Login"}
        </button>

        <div id={styles.contRegistro}>
          <span>
            ¿No tienes cuenta? <NavLink to="/register">Crear una</NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}
