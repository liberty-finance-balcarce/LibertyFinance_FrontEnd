import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Register.module.css";
import { useAuth } from "../hooks/useAuth";
import { useProvincias } from "../hooks/useProvincias";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { provinciasList } = useProvincias();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    contraseña: "",
    codArea: "",
    telefono: "",
    sexo: "",
    dni: "",
    provincia: "",
    localidad: "",
    terminos: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.nombre.trim())
      return "El nombre de usuario no puede estar vacio.";
    if (!formData.apellido.trim()) return "El apellido no puede estar vacio.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) return "El mail debe ser valido.";

    if (formData.contraseña.length < 4 || formData.contraseña.length > 10) {
      return "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (!formData.codArea.trim() || !formData.telefono.trim()) {
      return "El codigo de área y el telefono no pueden estar vacios.";
    }
    if (!/^\d+$/.test(formData.codArea) || !/^\d+$/.test(formData.telefono)) {
      return "El numero de telefono debe contener solo números.";
    }

    if (!/^\d+$/.test(formData.dni)) {
      return "El DNI del usuario debe ser un numero sin puntos.";
    }

    const provId = Number(formData.provincia);
    if (!provId || provId < 1) {
      return "Debe seleccionar una provincia valida.";
    }

    if (!formData.localidad.trim())
      return "La localidad (direccion) no puede estar vacia.";

    if (!formData.terminos)
      return "Debes aceptar los Terminos y Condiciones para continuar.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
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
        id_perfilinv: 1,
        id_codigo_referidos: 0,
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
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mail">Mail:</label>
              <input
                type="email"
                id="mail"
                name="mail"
                placeholder="ejemplo@ejemplo.com"
                value={formData.mail}
                onChange={handleChange}
                required
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                placeholder="Mínimo 4 caracteres"
                minLength={4}
                maxLength={10}
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label>Número de teléfono:</label>
              <div className={styles.phoneGroup}>
                <input
                  type="text"
                  name="codArea"
                  placeholder="Cod Área"
                  value={formData.codArea}
                  onChange={handleChange}
                  className={styles.codArea}
                />
                <input
                  type="text"
                  name="telefono"
                  placeholder="Número sin 0 ni 15"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={styles.telNumber}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="sexo">Sexo:</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                  <option value="X">Otro</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dni">DNI:</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="SIN PUNTOS"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                />
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
                  required
                >
                  <option value="">Seleccione...</option>
                  {/* Mapeo dinámico de provincias usando el hook */}
                  {provinciasList.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.provincia}
                    </option>
                  ))}
                </select>
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="localidad">Localidad:</label>
                <input
                  type="text"
                  id="localidad"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleChange}
                  required
                />
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

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnVolver}
            onClick={() => navigate(-1)}
          >
            VOLVER
          </button>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={isLoading}
          >
            {isLoading ? "CREANDO..." : "CREAR CUENTA"}
          </button>
        </div>
      </form>
    </main>
  );
}
