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
    fecha_nacimiento: "",
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
    const { name, value } = e.target;

    if (name === "terminos") {
      setFormData((prev) => ({
        ...prev,
        terminos: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    if (name === "nombre" || name === "apellido") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""),
      }));
      return;
    }

    if (name === "mail") {
      setFormData((prev) => ({
        ...prev,
        mail: value.trim(),
      }));
      return;
    }

    if (name === "contraseña") {
      setFormData((prev) => ({
        ...prev,
        contraseña: value.slice(0, 10),
      }));
      return;
    }

    if (name === "codArea") {
      setFormData((prev) => ({
        ...prev,
        codArea: value.replace(/\D/g, "").slice(0, 4),
      }));
      return;
    }

    if (name === "telefono") {
      setFormData((prev) => ({
        ...prev,
        telefono: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    if (name === "dni") {
      setFormData((prev) => ({
        ...prev,
        dni: value.replace(/\D/g, "").slice(0, 8),
      }));
      return;
    }

    if (name === "fecha_nacimiento") {
      setFormData((prev) => ({
        ...prev,
        fecha_nacimiento: value,
      }));
      return;
    }

    if (name === "provincia") {
      setFormData((prev) => ({
        ...prev,
        provincia: value.replace(/\D/g, ""),
      }));
      return;
    }

    if (name === "localidad") {
      setFormData((prev) => ({
        ...prev,
        localidad: value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, ""),
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.nombre.trim()) {
      return "El nombre de usuario no puede estar vacio.";
    }

    if (!formData.apellido.trim()) {
      return "El apellido no puede estar vacio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.mail)) {
      return "El mail debe ser valido.";
    }

    if (formData.contraseña.length < 4 || formData.contraseña.length > 10) {
      return "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (!formData.codArea.trim() || !formData.telefono.trim()) {
      return "El codigo de area y el telefono no pueden estar vacios.";
    }

    if (!/^\d+$/.test(formData.codArea) || !/^\d+$/.test(formData.telefono)) {
      return "El numero de telefono debe contener solo numeros.";
    }

    if (!formData.fecha_nacimiento.trim()) {
      return "La fecha de nacimiento no puede estar vacia.";
    }

    const fechaNacimiento = new Date(formData.fecha_nacimiento);
    const fechaActual = new Date();

    if (Number.isNaN(fechaNacimiento.getTime())) {
      return "La fecha de nacimiento debe ser valida.";
    }

    if (fechaNacimiento > fechaActual) {
      return "La fecha de nacimiento no puede ser mayor a la fecha actual.";
    }

    if (!/^\d+$/.test(formData.dni)) {
      return "El DNI del usuario debe ser un numero sin puntos.";
    }

    if (formData.dni.length < 7 || formData.dni.length > 8) {
      return "El DNI debe tener entre 7 y 8 numeros.";
    }

    const provId = Number(formData.provincia);

    if (!provId || provId < 1) {
      return "Debe seleccionar una provincia valida.";
    }

    if (!formData.localidad.trim()) {
      return "La localidad (direccion) no puede estar vacia.";
    }

    if (!formData.terminos) {
      return "Debes aceptar los Terminos y Condiciones para continuar.";
    }

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
                value={formData.nombre}
                onChange={handleChange}
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
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mail">Mail:</label>
              <input
                type="text"
                id="mail"
                name="mail"
                placeholder="ejemplo@ejemplo.com"
                value={formData.mail}
                onChange={handleChange}
              />
              <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="text"
                id="contraseña"
                name="contraseña"
                placeholder="Mínimo 4 caracteres"
                value={formData.contraseña}
                onChange={handleChange}
              />
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
                  placeholder="Cod Area"
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
                <label htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                />
                <span className={styles.hint}>* CAMPO OBLIGATORIO</span>
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
                >
                  <option value="">Seleccione...</option>
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