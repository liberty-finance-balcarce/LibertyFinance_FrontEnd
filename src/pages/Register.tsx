import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Register.module.css";
import { useAuth } from "../hooks/useAuth";
import { useProvincias } from "../hooks/useProvincias";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../components/Button";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { provinciasList } = useProvincias();

  const [showPassword, setShowPassword] = useState(false);

  const getPerfilInversorFromTest = () => {
    const savedTest = localStorage.getItem("testInversor");

    if (!savedTest) return "";

    const data = JSON.parse(savedTest);

    if (!data.finished) return "";

    const selections: number[] = data.selections ?? [];
    const score = selections.reduce((acc, value) => acc + (value || 0), 0);

    if (score <= 30) return "1";
    if (score <= 60) return "2";

    return "3";
  };

  const [formData, setFormData] = useState({
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
  });

  const [formErrors, setFormErrors] = useState({
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
    perfilInversor: "",
    terminos: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string | boolean) => {
    const stringValue = typeof value === "string" ? value : "";

    switch (name) {
      case "nombre":
        return stringValue.trim()
          ? ""
          : "El nombre de usuario no puede estar vacio.";
      case "apellido":
        return stringValue.trim() ? "" : "El apellido no puede estar vacio.";
      case "mail":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)
          ? ""
          : "El mail debe ser valido.";
      case "contraseña":
        if (stringValue.length < 8 || stringValue.length > 16) {
          return "La contraseña debe tener entre 8 y 16 caracteres.";
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#*])/.test(stringValue)
          ? ""
          : "La contraseña debe incluir al menos una minuscula, una mayuscula y un caracter especial (# o *).";
      case "codArea":
        if (!stringValue.trim()) return "El codigo de area es obligatorio.";
        return /^\d+$/.test(stringValue)
          ? ""
          : "El codigo de area debe contener solo numeros.";
      case "telefono":
        if (!stringValue.trim()) return "El telefono es obligatorio.";
        return /^\d+$/.test(stringValue)
          ? ""
          : "El telefono debe contener solo numeros.";
      case "fecha_nacimiento": {
        if (!stringValue.trim()) {
          return "La fecha de nacimiento no puede estar vacia.";
        }
        const fechaNacimiento = new Date(stringValue);
        if (Number.isNaN(fechaNacimiento.getTime())) {
          return "La fecha de nacimiento debe ser valida.";
        }
        return fechaNacimiento <= new Date()
          ? ""
          : "La fecha de nacimiento no puede ser mayor a la fecha actual.";
      }
      case "dni":
        if (!/^\d+$/.test(stringValue)) {
          return "El DNI del usuario debe ser un numero sin puntos.";
        }
        return stringValue.length >= 7 && stringValue.length <= 8
          ? ""
          : "El DNI debe tener entre 7 y 8 numeros.";
      case "provincia":
        return Number(stringValue) >= 1
          ? ""
          : "Debe seleccionar una provincia valida.";
      case "localidad":
        return stringValue.trim()
          ? ""
          : "La localidad (direccion) no puede estar vacia.";
      case "perfilInversor":
        return Number(stringValue) >= 1
          ? ""
          : "Debe seleccionar un perfil de inversor valido.";
      case "terminos":
        return value
          ? ""
          : "Debes aceptar los Terminos y Condiciones para continuar.";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "terminos") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        terminos: checked,
      }));
      setFormErrors((prev) => ({
        ...prev,
        terminos: validateField("terminos", checked),
      }));
      return;
    }

    let sanitizedValue = value;
    if (name === "perfilInversor" || name === "provincia") {
      sanitizedValue = value.replace(/\D/g, "");
    }
    if (name === "nombre" || name === "apellido") {
      sanitizedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }
    if (name === "mail") {
      sanitizedValue = value.trim();
    }
    if (name === "contraseña") {
      sanitizedValue = value.slice(0, 16);
    }
    if (name === "codArea") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 4);
    }
    if (name === "telefono") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    }
    if (name === "dni") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 8);
    }
    if (name === "localidad") {
      sanitizedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, sanitizedValue),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newErrors = Object.fromEntries(
      Object.entries(formData).map(([name, value]) => [
        name,
        validateField(name, value),
      ]),
    ) as typeof formErrors;

    setFormErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        dni_usuario: Number(formData.dni),
        nombre: formData.nombre,
        apellido: formData.apellido,
        mail: formData.mail,
        contraseña: formData.contraseña,
        numero_telefono: `${formData.codArea}${formData.telefono}`,
        direccion: formData.localidad,
        id_provincia: Number(formData.provincia),
        id_perfilinv: Number(formData.perfilInversor),
        id_codigo_referidos: 0,
        fecha_nacimiento: formData.fecha_nacimiento,
      };

      const response = await register(payload);

      if (!response.ok) {
        throw new Error(
          "Ocurrio un error al intentar registrar el usuario. Verifica que el DNI o Email no existan.",
        );
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>REGISTRARSE</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gridContainer}>
          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Juan"
                value={formData.nombre}
                onChange={handleChange}
                className={formErrors.nombre ? styles.inputError : ""}
              />
              {formErrors.nombre && (
                <span className={styles.fieldError}>{formErrors.nombre}</span>
              )}
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Pérez"
                value={formData.apellido}
                onChange={handleChange}
                className={formErrors.apellido ? styles.inputError : ""}
              />
              {formErrors.apellido && (
                <span className={styles.fieldError}>{formErrors.apellido}</span>
              )}
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mail">Mail:</label>
              <input
                type="email"
                id="mail"
                name="mail"
                placeholder="juan.perez@gmail.com"
                value={formData.mail}
                onChange={handleChange}
                className={formErrors.mail ? styles.inputError : ""}
              />
              {formErrors.mail && (
                <span className={styles.fieldError}>{formErrors.mail}</span>
              )}
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contraseña">Contraseña:</label>

              <div className={styles.passwordGroup}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="contraseña"
                  name="contraseña"
                  placeholder="Adminjk12*"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className={formErrors.contraseña ? styles.inputError : ""}
                />

                <Button
                  type="button"
                  className={styles.btnPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  title={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>

              {formErrors.contraseña && (
                <span className={styles.fieldError}>
                  {formErrors.contraseña}
                </span>
              )}
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label>Numero de telefono:</label>
              <div className={styles.phoneGroup}>
                <input
                  type="text"
                  name="codArea"
                  placeholder="2266"
                  value={formData.codArea}
                  onChange={handleChange}
                  className={`${styles.codArea} ${formErrors.codArea ? styles.inputError : ""}`}
                />

                <input
                  type="text"
                  name="telefono"
                  placeholder="456789"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`${styles.telNumber} ${formErrors.telefono ? styles.inputError : ""}`}
                />
              </div>
              {formErrors.codArea && (
                <span className={styles.fieldError}>{formErrors.codArea}</span>
              )}
              {formErrors.telefono && (
                <span className={styles.fieldError}>{formErrors.telefono}</span>
              )}
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  placeholder="2000-01-01"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className={
                    formErrors.fecha_nacimiento ? styles.inputError : ""
                  }
                />
                {formErrors.fecha_nacimiento && (
                  <span className={styles.fieldError}>
                    {formErrors.fecha_nacimiento}
                  </span>
                )}
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dni">DNI:</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="40123456"
                  value={formData.dni}
                  onChange={handleChange}
                  className={formErrors.dni ? styles.inputError : ""}
                />
                {formErrors.dni && (
                  <span className={styles.fieldError}>{formErrors.dni}</span>
                )}
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="provincia">Provincia:</label>
                <select
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className={formErrors.provincia ? styles.inputError : ""}
                >
                  <option value="">Elegí una provincia</option>
                  {provinciasList.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.provincia}
                    </option>
                  ))}
                </select>
                {formErrors.provincia && (
                  <span className={styles.fieldError}>
                    {formErrors.provincia}
                  </span>
                )}
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="localidad">Localidad:</label>
                <input
                  type="text"
                  id="localidad"
                  name="localidad"
                  placeholder="Balcarce"
                  value={formData.localidad}
                  onChange={handleChange}
                  className={formErrors.localidad ? styles.inputError : ""}
                />
                {formErrors.localidad && (
                  <span className={styles.fieldError}>
                    {formErrors.localidad}
                  </span>
                )}
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="perfilInversor">Perfil de inversor:</label>
                <select
                  id="perfilInversor"
                  name="perfilInversor"
                  value={formData.perfilInversor}
                  onChange={handleChange}
                  className={
                    formErrors.perfilInversor ? styles.inputError : ""
                  }
                >
                  <option value="">Seleccionar perfil</option>
                  <option value="1">Conservador</option>
                  <option value="2">Moderado</option>
                  <option value="3">Agresivo</option>{" "}
                </select>
                {formErrors.perfilInversor && (
                  <span className={styles.fieldError}>
                    {formErrors.perfilInversor}
                  </span>
                )}
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.termsGroup}>
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            checked={formData.terminos}
            onChange={handleChange}
          />

          <label htmlFor="terminos">
            He leído y acepto los{" "}
            <a href="/terminos-y-condiciones" className={styles.link}>
              Términos y Condiciones
            </a>
          </label>
        </div>
        {formErrors.terminos && (
          <span className={styles.termsError}>{formErrors.terminos}</span>
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
            disabled={isLoading}
          >
            {isLoading ? "CREANDO..." : "CREAR CUENTA"}
          </Button>
        </div>
      </form>
    </main>
  );
}
