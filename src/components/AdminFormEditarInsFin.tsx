import { useEffect, useState } from "react";
import { Button } from "./Button";
import type { Instrumento } from "../types/instrumento-financiero";
import { Riesgo, TipoInstrumento } from "../types/instrumento-financiero";
import styles from "../styles/components/AdminFormEditarInstFin.module.css";
import type { UpdateInstrumentoFinanciero } from "../types/instrumento-financiero";

interface Props {
  instrumento: Instrumento | null;
  onClose: () => void;
  onSave: (data: UpdateInstrumentoFinanciero) => void;
}

export function AdminFormEditarInstrumento({
  instrumento,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    nombre_instrumento: "",
    rendimiento: "",
    precio_instrumento: 0,
    riesgo: "" as Riesgo,
    tipo_instrumento: "" as TipoInstrumento,
  });

  useEffect(() => {
    if (instrumento) {
      setFormData({
        nombre_instrumento: instrumento.nombre_instrumento ?? "",
        rendimiento: instrumento.rendimiento?.toString() ?? "",
        precio_instrumento: Number(instrumento.precio_instrumento) ?? 0,
        riesgo: instrumento.riesgo ?? Riesgo.BAJO,
        tipo_instrumento:
          instrumento.tipo_instrumento ?? TipoInstrumento.TRADICIONAL,
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

    const datosEnviar: UpdateInstrumentoFinanciero = {
      nombre_instrumento: formData.nombre_instrumento,
      rendimiento: Number(formData.rendimiento) || 0,
      precio_instrumento: Number(formData.precio_instrumento) || 0,
      riesgo: formData.riesgo,
      tipo_instrumento: formData.tipo_instrumento,
    };

    onSave(datosEnviar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Editar instrumento</h2>

          <input
            type="text"
            name="nombre_instrumento"
            value={formData.nombre_instrumento}
            onChange={handleChange}
            placeholder="Nombre del instrumento"
            required
          />

          <input
            type="number"
            name="rendimiento"
            value={formData.rendimiento}
            onChange={handleChange}
            placeholder="Rendimiento (%)"
            required
          />

          <input
            type="text"
            name="precio_instrumento"
            value={formData.precio_instrumento}
            onChange={handleChange}
            placeholder="Precio"
            required
          />

          <select
            name="riesgo"
            value={formData.riesgo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el Riesgo</option>
            {Object.values(Riesgo).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            name="tipo_instrumento"
            value={formData.tipo_instrumento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Tipo</option>
            {Object.values(TipoInstrumento).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

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
