import { useEffect, useState } from "react";

import type { UpdateUsuarioDTO } from "../types/usuario/updateUsuarioDTO";
import type { Usuario } from "../types/usuarios";

import styles from "../styles/components/FormEditarUsuario.module.css";

import type { Provincia } from "../types/provincias";
import type { Rol } from "../types/rol";
import { Button } from "./Button";

interface Props {
  usuario: Usuario | null;
  provincias: Provincia[];
  roles: Rol[];
  onClose: () => void;
  onSave: (data: UpdateUsuarioDTO) => void;
}

export function FormEditarUsuario({
  usuario,
  provincias,
  roles,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    numero_telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    id_provincia: "",
    id_rol: "",
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre ?? "",
        apellido: usuario.apellido ?? "",
        mail: usuario.mail ?? "",
        numero_telefono: usuario.numero_telefono ?? "",
        direccion: usuario.direccion ?? "",
        fecha_nacimiento: usuario.fecha_nacimiento
          ? usuario.fecha_nacimiento.split("T")[0]
          : "",
        id_provincia: usuario.provincia?.id?.toString() ?? "",
        id_rol: usuario.rol?.id_rol?.toString() ?? "",
      });
    }
  }, [usuario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const datosEnviar = {
      ...formData,
      id_provincia: formData.id_provincia
        ? Number(formData.id_provincia)
        : undefined,
      id_rol: formData.id_rol ? Number(formData.id_rol) : undefined,
    };

    onSave(datosEnviar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Editar usuario</h2>

          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="numero_telefono"
            value={formData.numero_telefono}
            onChange={handleChange}
            placeholder="Teléfono"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
          />

          <select
            name="id_rol"
            value={formData.id_rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un Rol</option>
            {(roles || []).map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.nombre}
              </option>
            ))}
          </select>

          <select
            name="id_provincia"
            value={formData.id_provincia}
            onChange={handleChange}
          >
            <option value="">Seleccione una Provincia</option>
            {(provincias || []).map((p) => (
              <option key={p.id} value={p.id}>
                {p.provincia}
              </option>
            ))}
          </select>

          <div className={styles.boton}>
            <Button type="submit">Guardar</Button>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
