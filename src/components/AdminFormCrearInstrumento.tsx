import { useEffect, useState } from "react";
import type { CreateInstrumentoFinanciero } from "../types/instrumento-financiero";
import {
  TipoInstrumento,
  type Instrumento,
  Riesgo,
} from "../types/instrumento-financiero";
import styles from "../styles/components/AdminFormCrearInstrumento.module.css";
import { Button } from "./Button";

interface Props {
  instrumento?: Instrumento | null;
  onClose: () => void;
  onSave: (data: CreateInstrumentoFinanciero) => void;
}

export function FormCrearInstrumento({ instrumento, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    nombre_instrumento: "",
    rendimiento: "",
    precio_instrumento: "",
    riesgo: "" as Riesgo,
    tipo_instrumento: "" as TipoInstrumento,
    logo_url: "",
  });

  useEffect(() => {
    if (instrumento) {
      setFormData({
        nombre_instrumento: instrumento.nombre_instrumento ?? "",
        rendimiento: instrumento.rendimiento?.toString() ?? "",
        precio_instrumento: instrumento.precio_instrumento?.toString() ?? "",
        riesgo: instrumento.riesgo ?? ("" as Riesgo),
        tipo_instrumento:
          instrumento.tipo_instrumento ?? ("" as TipoInstrumento),
        logo_url: "",
      });
    }
  }, [instrumento]);

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

    const dataAEnviar: CreateInstrumentoFinanciero = {
      nombre_instrumento: formData.nombre_instrumento.trim(),
      rendimiento: Number(formData.rendimiento) || 0,
      precio_instrumento: Number(formData.precio_instrumento) || 0,
      riesgo: formData.riesgo,
      tipo_instrumento: formData.tipo_instrumento,
      logo_url: formData.logo_url,
    };

    onSave(dataAEnviar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Crear Nuevo Instrumento</h2>

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre_instrumento"
              value={formData.nombre_instrumento}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Rendimiento (%):</label>
            <input
              type="number"
              name="rendimiento"
              value={formData.rendimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Precio:</label>
            <input
              type="number"
              step="0.01"
              name="precio_instrumento"
              value={formData.precio_instrumento}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Riesgo:</label>
            <select
              name="riesgo"
              value={formData.riesgo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value={Riesgo.BAJO}>Bajo</option>
              <option value={Riesgo.MEDIO}>Medio</option>
              <option value={Riesgo.ALTO}>Alto</option>
            </select>
          </div>

          <div>
            <label>Tipo de Instrumento:</label>
            <select
              name="tipo_instrumento"
              value={formData.tipo_instrumento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value={TipoInstrumento.TRADICIONAL}>Tradicional</option>
              <option value={TipoInstrumento.NO_TRADICIONAL}>
                No Tradicional
              </option>
            </select>

            <div>
              <label>URL del Logo:</label>
              <input
                type="text"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.boton}>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
