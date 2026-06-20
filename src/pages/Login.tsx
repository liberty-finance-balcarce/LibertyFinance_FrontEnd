import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import styles from "../styles/pages/Login.module.css";

interface DatosRecibidos {
  dni_usuario: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [isVisible, setIsVisible]=useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DatosRecibidos>({
    mode: "onTouched",

    defaultValues: {
      dni_usuario: "",
      password: "",
    },
  });

  const visibleOnOff = ()=>{
    setIsVisible((prev)=>!prev);
  }

  const enviarForm = async (data: DatosRecibidos) => {
    setErrorServidor(null);

    try {
      const dniNumerico = Number(data.dni_usuario);

      const response = await login(dniNumerico, data.password);

      if (!response.ok) {
        throw new Error("Credenciales incorrectas.");
      }

      navigate("/");
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        setErrorServidor("Error en la conexión con el servidor.");
      } else {
        setErrorServidor(err.message || "Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <section className={styles.containerLogin}>
      <h1 className={styles.h1}>Iniciar sesión</h1>
      <form
        className={styles.formLogin}
        onSubmit={handleSubmit(enviarForm)}
        noValidate
      >
        <label htmlFor="dni_usuario" className={styles.etiquetaForm}>
          DNI
        </label>
        <input
          className={styles.inputForm}
          id="dni_usuario"
          maxLength={8}
          autoComplete="off"
          type="text"
          {...register("dni_usuario", {
            required: "Debe ingresar DNI.",
            pattern: { value: /^[0-9]+$/, message: "Solo se permiten números" },
            minLength: { value: 7, message: "Deben ser mínimo 7 números" },
            maxLength: { value: 8, message: "Deben ser máximo 8 números" },
          })}
          placeholder="Ingresa tu DNI"
        />
        <span className={styles.errorLogin}>
          {errors.dni_usuario?.message || ""}
        </span>

        <label htmlFor="password" className={styles.etiquetaForm}>
          Contraseña
        </label>
        <div className={styles.contPassword}>
         <input
           className={styles.inputForm}
           id="password"
           maxLength={16}
           autoComplete="off"
           type={isVisible? "text" : "password"}
           {...register("password", {
             required: "Debe ingresar contraseña.",
           })}
           placeholder="********"
         />
         <button type="button" onClick={visibleOnOff} className={styles.botonEye}>
          {isVisible?<IoEyeOffOutline/>:<IoEyeOutline/>}
         </button>
        </div>
        <span className={styles.errorLogin}>
          {errors.password?.message || ""}
        </span>

        {errorServidor && (
          <p
            className={styles.errorLogin}
          >
            {errorServidor}
          </p>
        )}

        <Button
          type="submit"
          variant="login"
          className={styles.botonLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cargando..." : "Login"}
        </Button>

        <div className={styles.contRegistro}>
          <span>
            ¿No tienes cuenta? <NavLink to="/register">Registrarse</NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}